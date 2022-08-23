import React from 'react';
import {BrowserRouter as Router, Switch} from 'react-router-dom';
import {createBrowserHistory} from "history";
import FrontendAuth from "./FrontendAuth";

const browserHistory = createBrowserHistory(); // 解决路由出现#的问题

export default class MyRouter extends React.Component {
    render(){
        return (
            <Router history={browserHistory}>
                <Switch>
                    <FrontendAuth/>
                </Switch>
            </Router>
        )
    }
};