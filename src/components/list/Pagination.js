import React from 'react';
import './Pagination.css';
import { withRouter } from 'react-router-dom';

const Pagination = (props) => {
    
    const { page, totalPages, handlePaginationClick, pegeNumber, handleClick } = props;
    return (
        <div className='Pagination'>

            <span className='Pagination-info'>
                Page <b>{page}</b> of <b>{totalPages}</b>
            </span>
            <br></br>

            <button
                onClick={() => handlePaginationClick('prev')}
                className='Pagination-button'
                disabled={page===1}
            >
                &larr;
            </button>

            <span >
                {pegeNumber.map(p => {
                    return <button className='Pagination-but'  onClick={() => handleClick(p)} key={p} >{p} </button>
                })}
            </span>

            <button
                onClick={() => handlePaginationClick("next")}
                className='Pagination-button'
                disabled={page===totalPages}
               
            >
                &rarr;
            </button>
            
        </div>
    );
};
export default withRouter(Pagination);