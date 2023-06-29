import React, { useContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import qs from 'qs';
import { Categories, Sort, BouquetBlock } from "../components";
import Skeleton from "../components/BouquetBlock/Skeleton";
import Pagination from "../components/pagination";
import { SearchContext } from "../App";
import { useSelector, useDispatch } from "react-redux";
import { setCategoryId,  setCurrentPage, setFilters } from "../redux/slices/filterSlice";
import { useNavigate } from "react-router-dom";
import { list } from "../components/Sort";


function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { searchValue } = useContext(SearchContext);
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const isSearch = useRef(false);
  const isMounted = useRef(false);

  const { categoryId, currentPage, sort }= useSelector((state) => state.filter);

  const onChangeCategory = (idx) => {
    dispatch(setCategoryId(idx));
  };
  const onChangePage = (page) => {
    dispatch(setCurrentPage(page))
  };

  const fetchBouquets = () => {
    setIsLoading(true);
    const order = sort.sortProperty.includes("-") ? "desc" : "asc";
    const sortBy = sort.sortProperty.replace("-", "");
    const category = categoryId > 0 ? `category=${categoryId}` : "";
    const search = searchValue ? `&search=${searchValue}` : "";
  
  
    axios
        .get(`https://646c67ff7b42c06c3b2b1a38.mockapi.io/items?page=${currentPage}&limit=3&${category}&sortBy=${sortBy}&order=${order}${search}`
        ).then((res) => {
          setItems(res.data);
          setIsLoading(false);
        });
  }


  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
     
      const sort = list.find((obj) => obj.sortProperty === params.sortProperty);
      
      dispatch(
        setFilters({
          ...params,
          sort,
        }),
      );
      isSearch.current = true;
    }
  }, []);

  useEffect(() => {
    if (!isSearch.current) {
      fetchBouquets();
    }
    isSearch.current = false;
    
  }, [categoryId, sort.sortProperty, searchValue, currentPage]);

  useEffect(() => {
   if (isMounted.current) {
    const queryString = qs.stringify({
      sortProperty: sort.sortProperty,
      categoryId,
      currentPage,
    })
    navigate(`?${queryString}`)
   }
   isMounted.current = true;
  }, [categoryId, sort.sortProperty, currentPage]);
   
  const bouquets = items.map((obj) => <BouquetBlock {...obj} key={obj.id} />);
  
  const skeletons = [...new Array(6)].map((_, i) => <Skeleton key={i} />);
  return (
    <>
      <div className="content__top">
        <Categories
          value={categoryId}
          onChooseCategory={(id) => onChangeCategory(id)}
        />
        <Sort />
      </div>
      <h2 className="content__title">All bouquets:</h2>
      <div className="content__items">{isLoading ? skeletons : bouquets}</div>
      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </>
  );
}

export default Home;
