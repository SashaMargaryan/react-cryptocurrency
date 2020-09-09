import React from 'react';
import './index.css';
import {  Route, Switch, withRouter } from 'react-router-dom';
import Header from './components/common/Header';
import List from './components/list/List';
import Detail from './components/detail/Detail';
import Home from './components/common/home/Home';



const App = (props) => {
    // console.log(props);
    // const {location} = props;
    
    return (
        <div>
            <Header />
            <Switch>
                <Route path='/' exact component={Home} />
                <Route  path='/list/page/:id' exact component={ List } />
                {/* <Route  path={location.pathname === '/' ? '/' : '/page/:id'} exact component={ List } /> */}
                <Route path="/page/currency/:id" exact  component={ Detail } />
            </Switch>
        </div>
    )
}
export default withRouter(App);