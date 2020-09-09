import React from 'react';
import {API_URL} from '../../../config';
import  { renderChangePercent } from '../../../helpers';
import Modal from './Modal';
import './Home.css';
import "./Modal.css";


class Home extends React.Component {
    constructor() {
        super();
        this.state ={
            currencies: [],
            error: null,
            perPage: 10,
            page: 1,
            showModal: 0,
            modal: false,
            currencProduct: ''
        }
    }

    
    fetchCurrencies = () => {
        const { perPage, page } = this.state;
        this.setState({
            loading: true
        });
        fetch(`${API_URL}/cryptocurrencies/?page=${page}&perPage=${perPage}`)
        .then(resp => {
            return resp.json().then(data => {
                console.log(data);
                if(resp.ok) {
                    return data;
                }else {
                    return Promise.reject(data);
                }
            })
        })
        .then(data => {
            this.setState({
                currencies: data.currencies,
                totalPages: data.totalPages
            })
        })
        .catch((error) => {
            console.log("ERROR", error);
        })
    };

    componentDidMount() {
       
        this.fetchCurrencies();
    };
    
    
      hendleClick = value => {
        this.setState({ 
            modal: this.state.modal ? false : true,
            currencProduct: value
         });
      };
    
      handleClose = () => {
        this.setState({ modal: !this.state.modal });
      };
    

    render() {
        const { currencies, currencProduct, modal } = this.state;
        // console.log(currencProduct);
        return (
            <div className="Table-container">
            <table className='Table'>
                    <thead className='Table-head'>
                        <tr>
                            <th>Cryptocurrency</th>
                            <th>Price</th>
                            <th>Market Cap</th>
                            <th>24H Change</th>
                        </tr>
                    </thead>
                   
                    <tbody className='Table-body'>
                        {
                            currencies.map((currency) => {
                                return (
                                    <tr  key={currency.id} onClick={() => this.hendleClick(currency)} >
                                        <td>
                                            <span className='Table-rank'>{currency.rank}</span>
                                            {currency.name}
                                        </td>
                                        <td>
                                            <span className='Table-dollar'>$</span>
                                            {currency.price}
                                        </td>
                                        <td>
                                            <span className='Table-dollar'>$</span>
                                            {currency.marketCap}
                                        </td>
                                        <td>
                                            {renderChangePercent(currency.percentChange24h)}
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                   
                </table>

                <div 
                    className={"div-modal"} 
                    style={{ display: modal ? "block" : "none" }}
                    onClick={() => this.handleClose()}
                >
                    <Modal 
                        currencProduct={currencProduct} 
                        handleClose={ this.handleClose }
                        modal={modal} 
                    />
                </div>
               
        </div>
    )
        
    }
}

export default Home;