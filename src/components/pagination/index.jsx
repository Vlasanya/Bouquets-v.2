import React from 'react';
import ReactPaginate from "react-paginate";

import styles from './Pagination.module.scss';

function Pagination({ onChangePage, currentPage }) {
  return (
    <div>
        <ReactPaginate 
        className={styles.root}
        breakLabel='...'
        nextLabel='>'

        onPageChange={(e) => onChangePage(e.selected + 1)}
        pageRangeDisplayed={3}
        pageCount={3}
        forcePage={currentPage - 1}
        previousLabel='<'
        renderOnZeroPageCount={null}
        />
    </div>
  )
}

export default Pagination;