import React, { useState, useEffect } from 'react'

function Categories({ value, onChooseCategory }) {


  // const [activeIndex, setActiveIndex] = useState(0);
  const categories = ['All', 'Roses', 'Peonies', 'Lilies', 'Daisies', 'Tulips' ]

  // const onClickCategory = (index) => {
  //   if (window.innerWidth <= 846) {
  //     setBurgerClass('burger-bar unclicked');
  //     setMenuClass('menu hidden');
  //   }
  //   setActiveIndex(index);
  // }
  const [burgerClass, setBurgerClass] = useState('burger-bar unclicked');
  const [menuClass, setMenuClass] = useState('menu hidden');
  const [isMenuClicked, setIsMenuClicked] = useState(false);

 
 

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 846) {
        setBurgerClass('burger-bar unclicked');
        setMenuClass('menu hidden');
      } else {
        setBurgerClass('burger-bar unclicked');
        setMenuClass('menu visible');
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const updateMenu = () => {
    if(!isMenuClicked) {
      setBurgerClass('burger-bar clicked')
      setMenuClass('menu visible')
    }
    else {
      setBurgerClass('burger-bar unclicked')
      setMenuClass('menu hidden')
    }
    setIsMenuClicked(!isMenuClicked)
  }
  return (
    <div className="categories">
      <div className={'burger--menu'} onClick={updateMenu}>
        <div className={burgerClass}></div>
        <div className={burgerClass}></div>
        <div className={burgerClass}></div>
      </div>
    <ul className={menuClass}>
     
      {
        categories.map((categoryName, i) => (
        <li 
        onClick={() => onChooseCategory(i)}
        
        className={value === i ? "active" : ''} 
        key={categoryName}>{categoryName}</li>))
      }
    </ul>
   
  </div>
  )
}

export default Categories;