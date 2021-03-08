import React from 'react';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Page2 from './component/page2/';
import App from './App';
import Category from './component/page2/';
import ManageAccounts from './component/manageaccounts/';
import UnifiedAccountProfile from './component/unifiedAccountprofile'
import Header from "./component/Header";
function  WithHeader({ component, background }) {
    return (
         <div>
            <div style={{ position: 'fixed', top: 0, right: 0, left: 0}}>
                <Header />
                <Category />
            </div>   
            <div style={{ marginTop: 100 }}>
                {component}
            </div>    
        </div>  
    )
}

function RoutesManager() {
    return (
        <Router>
            <Switch>
            <Route path="/enrichment-queue">
                <WithHeader component={<ManageAccounts />}  />
            </Route>
            <Route path="/unified-account-profile">
                <WithHeader component={<UnifiedAccountProfile />}  />
            </Route>
            <Route path="/">
                <WithHeader component={<App />} />  
            </Route>
            
            </Switch>
        </Router>
    )
}

export default RoutesManager;
