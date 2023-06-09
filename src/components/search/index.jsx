import React, { useContext, useCallback, useRef, useState } from 'react';
import styles from './Search.module.scss';

import { SearchContext } from '../../App';
import debounce from 'lodash.debounce';


function Search() {
  const [value, setValue] = useState('');
  const { setSearchValue } = useContext(SearchContext);

  
  const updateSearchValue = useCallback(
    debounce((str) => {
    setSearchValue(str)}, 500), []);

  const onChangeInput = (event) => {
    setValue(event.target.value);
    updateSearchValue(event.target.value);
  }

  const inputRef = useRef();
  const onClickClear = () => {
    setSearchValue('');
    setValue('');
    inputRef.current.focus();
  }
  return (
    <div className={styles.root}>
      
       <input placeholder='Search your unique bouquet....' className={styles.input} value={value} onChange={onChangeInput} ref={inputRef}/>
       {value ? (<svg className={`${styles.icon} ${styles.iconClose}`} onClick={onClickClear} xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="m249-207-42-42 231-231-231-231 42-42 231 231 231-231 42 42-231 231 231 231-42 42-231-231-231 231Z" /></svg>) :
       <svg className={styles.icon} xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M796-121 533-384q-30 26-69.959 40.5T378-329q-108.162 0-183.081-75Q120-479 120-585t75-181q75-75 181.5-75t181 75Q632-691 632-584.85 632-542 618-502q-14 40-42 75l264 262-44 44ZM377-389q81.25 0 138.125-57.5T572-585q0-81-56.875-138.5T377-781q-82.083 0-139.542 57.5Q180-666 180-585t57.458 138.5Q294.917-389 377-389Z" /></svg>}
    </div>
   
   
  )
}

export default Search;