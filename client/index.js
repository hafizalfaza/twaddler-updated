import React, { Component } from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter as Router } from 'react-router-redux'
import { configureStore, history } from './redux/configureStore';
import App from './Components/App';
import SignupPage from './Components/SignupComponents/SignupPage';
import 'rxjs';
import { Route } from 'react-router';
import { setAuthorizationToken } from './utils/setAuthorizationToken';
import { setCurrentUser } from './redux/actions/auth';

const store = configureStore()

if(localStorage.jwtToken){
    setAuthorizationToken(localStorage.jwtToken);
    store.dispatch(setCurrentUser({token: localStorage.jwtToken, data: JSON.parse(localStorage.user)}));
}

render(
<Provider store={ store }>
<Router history={ history }>
    <div>      
        <Route exact path="/" component={App} />
        <Route exact path="/signup" component={SignupPage} />
    </div>
</Router>
</Provider>, document.getElementById('app'));