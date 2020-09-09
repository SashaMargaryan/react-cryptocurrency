import React from 'react';
import {API_URL} from '../../config';
import Table from './Table';
import Loading from '.././common/Loading';
import Pagination from './Pagination';
import Select from './Select';
import './Table.css';


class List extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            currencies: [],
            error: null,
            perPage: 10,
            page:  props.match.params.id ? +props.match.params.id : 1,
            
        };
        this.handlePaginationClick = this.handlePaginationClick.bind(this);
        this.handleChangeSelect  = this.handleChangeSelect.bind(this);
    };

    fetchCurrencies() {
        const { perPage,page } = this.state;
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
                loading: false,
                currencies: data.currencies,
                totalPages: data.totalPages
            })
        })
        .catch((error) => {
            console.log("ERROR", error);
        })
    };

    handlePaginationClick(direction) {
        
        let nextPage = this.state.page;
        nextPage = direction === "next" ? nextPage + 1 : nextPage - 1;
        this.setState({
            page: nextPage
        }, () => {
            
            const {page} =  this.state;
            const {history} = this.props;
            
            history.push(`/list/page/${page}`);
            this.fetchCurrencies();
            
        });
    };

    componentDidMount() {
        const {page} =  this.state;
        const {history} = this.props;
        
        history.push(`/list/page/${page}`);
        this.fetchCurrencies();
    };
    // componentWillReceiveProps(nextProps) {
        
    //     if (this.props.location.pathname !== nextProps.location.pathname) {
    //         const currencyId = nextProps.match.params.id;
    //         // const {page} =  this.state;
    //         const {history} = this.props;
    //         history.push(`/page/${ currencyId }`);
    //        this.fetchCurrencies()
    //     }
    // }
  

    handleChangeSelect(event) {
        const {page} =  this.state;
         
        this.setState({
          perPage: event.target.value
        }, () => {
            this.fetchCurrencies();
        });
        if(page > 2 && event.target.value >= 50 ) {
            this.setState({
                perPage: 10,
                page: 1
            }, () => {
                const {page} =  this.state;
                const {history} = this.props;
                history.push(`/list/page/${ page }`);
               this.fetchCurrencies();
            })
        };
       
      };

      handleClick = (event) => {
        // const {page, perPage} =  this.state;
        //   if(perPage )
        this.setState({
         page: event
        },() => {
            const {page} =  this.state;
            const {history} = this.props;
            
            history.push(`/list/page/${ page }`);
            this.fetchCurrencies();
        });
      };
      handleBack = (event) => {
        this.setState({
         page: event
        },() => {
            const {page} =  this.state;
            const {history} = this.props;
            
            history.push(`/list/page/${ page }`);
            this.fetchCurrencies();
        });
      };
    
    render() {
        const {loading, currencies, error, page, totalPages, perPage } = this.state;
        
        if(loading) {
            return (
                <div className='loading-container'>
                    <Loading />
                </div>
            );
        };

        const pegeNumber = [];
        for(let i=1; i<= totalPages ; i++) {
            pegeNumber.push(i);
        };
        return (
            <div className=''>
                <Select 
                    handleChangeSelect={this.handleChangeSelect} 
                    perPage={perPage}
                    handleBack={this.handleBack} 
                />
                <Table 
                    currencies={currencies}
                />
                <Pagination
                     page={page}
                     totalPages={totalPages} 
                     handlePaginationClick={this.handlePaginationClick}
                     pegeNumber={pegeNumber}
                     handleClick={this.handleClick}
                    
                     
                />
            </div>
        );
    };
};

export default List;