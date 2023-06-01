import React, { useEffect, useState } from "react";

import { Categories, Sort, BouquetBlock } from '../components';
import Skeleton from "../components/BouquetBlock/Skeleton";

function Home({ searchValue }) {
  const [ items, setItems ] = useState([]);
  const [ isLoading, setIsLoading ] = useState(true);
  const [ sortType, setSortType ] = useState(
    { name: 'Popular', sortProperty: 'rating' }
  );
  const [ categoryId, setCategoryId ] = useState(0);


  useEffect(() => {
    setIsLoading(true);
    const order = sortType.sortProperty.includes('-') ? 'desc' : 'asc';
    const sortBy = sortType.sortProperty.replace('-', '');
    const category = categoryId > 0 ? `category=${categoryId}` : '';
    const search = searchValue ? `&search=${searchValue}` : '';

      fetch(`https://646c67ff7b42c06c3b2b1a38.mockapi.io/items?${category}&sortBy=${sortBy}&order=${order}${search}`,)
      .then((res) => {
      return res.json()
        }).then((json) => {
          setItems(json);
          setIsLoading(false);
        })
  }, [categoryId, sortType, searchValue]);

  const bouquets = items.map((obj) => (<BouquetBlock {...obj} key={obj.id} />));
  //filter((obj) => {
  //   if (obj.name.toLowerCase().includes(searchValue.toLowerCase())){
  //     return true;
  //   }
  //   return false;
  // }).
  const skeletons = [...new Array(6)].map((_, i ) => <Skeleton   key={i}/>);
  return (
    <>
    <div className="content__top">
          <Categories value={categoryId} onChooseCategory={(id) => setCategoryId(id)}/>
          <Sort value={sortType} onChooseSort={(id) => setSortType(id)}/>
        </div>
        <h2 className="content__title">All bouquets:</h2>
        <div className="content__items">
     
          {
            isLoading ? skeletons : bouquets
          }
       
        </div>
    </>
  )
}

export default Home