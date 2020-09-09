import React from 'react';
import './Select.css';

const Select = ({ handleChangeSelect , perPage ,handleBack }) => {
    return (
        <div>
            <button className='button-page1' onClick={() => handleBack(1)}> Page N-1</button>
            <br></br>
            <select value={perPage} onChange={handleChangeSelect}>
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="25">25</option>
                <option value="75">50</option>
            </select>
        </div>
    )
}
export default Select;