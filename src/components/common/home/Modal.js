import React, { Component } from "react";
import { renderChangePercent } from '../../../helpers';

import "./Modal.css";

class Modal extends Component {
  
  render() {
    // console.log(this.props);
    const { currencProduct, modal, handleClose } = this.props;
    return (
      <div style={{display: modal ? "block" : "none"}} className={"Div-modal"}>
          
                <div className="Detail-container">
                <h1 className="clos" onClick={() => handleClose()}>	&times;</h1>
                    <h1 className="Detail-heading">
                        {currencProduct.name} ({currencProduct.id}) 
                    </h1>
                    <div className="Detail-item">
                        Price <span className="Detail-value">$ {currencProduct.price}</span>
                    </div>
                    <div className="Detail-item">
                        Rank <span className="Detail-value">{currencProduct.rank}</span>
                    </div>
                    <div className="Detail-item">
                        24H Change
                        <span className="Detail-value">{renderChangePercent(currencProduct.percentChange24h)}</span>
                    </div>
                    <div className="Detail-item">
                        <span className="Detail-title">Market cap</span>
                        <span className="Detail-dollar">$</span>
                        {currencProduct.marketCap}
                    </div>
                  <div className="Detail-item">
                      <button onClick={() => handleClose()}>closss</button>
                  </div>
                </div>
      </div>
    )
  }
}
  

export default Modal;