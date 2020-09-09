import React from "react";
import { Link } from 'react-router-dom';
import './Header.css';
import logo from './logo.png';
import Search from './Search';
import {withRouter} from 'react-router-dom';

const Header = (props) => {
    return (
        <div className='Header'>
            
            <Link to={ `/list/page/${props.match.params.id ? +props.match.params.id : 1}`}>
                <img src={logo} className='Header-logo' alt='logo' />
            </Link>
            <br></br>
            <Link className={'home'} to='/'>Home</Link>
            <Search />
        </div>
    );
};

export default withRouter( Header);