import React from 'react';
import RouterConfig from './RouterConfig';
import {Redirect, Route} from "react-router-dom";


export default class FrontendAuth extends React.Component {
    render(){
        const pathname = this.props.location.pathname;
        const targetRouter = RouterConfig.find(function(item) {
            return item.path === pathname;
        });

        const isLogin = JSON.parse(sessionStorage.getItem("loginstatus"));

        if (!isLogin) {
            if (targetRouter.auth) {
                console.log("please login");
                return (
                    <Redirect exact to="/login"></Redirect>
                )
            }else{
                return (
                    <Route exact path={pathname} component={targetRouter.component}></Route>
                )
            }
        }
    }
};