import React from 'react';
import RouterConfig from './RouterConfig';
import {Redirect, Route} from "react-router-dom";


export default class FrontendAuth extends React.Component {
    render(){
        console.log(this);
        const pathname = this.props.location.pathname;
        const targetRouter = RouterConfig.find(function(item) {
            return item.path === pathname;
        });

        const isLogin = localStorage.getItem("Authorization");

        if (!isLogin) {
            if (targetRouter.auth) {
                return (
                    <Redirect exact to="/login"></Redirect>
                )
            }else{
                return (
                    <Route exact path={pathname} component={targetRouter.component}></Route>
                )
            }
        }else{
            return (
                <Route exact path={pathname} component={targetRouter.component}></Route>
            )
        }
    }
};