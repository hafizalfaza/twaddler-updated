import { combineReducers, compose } from 'redux';
import { combineEpics } from 'redux-observable';
import auth from './reducers/auth';
import { routerReducer } from 'react-router-redux';
import { loginEpic } from './observables/epics/loginEpic';
import { signupEpic } from './observables/epics/signupEpic';
import { newsfeedEpic } from './observables/epics/newsfeedEpic';

import loginPage from './reducers/PageReducers/loginPage';
import signupPage from './reducers/PageReducers/signupPage';
import newsfeedPage from './reducers/PageReducers/newsfeedPage';

export const rootEpic = combineEpics(
    loginEpic,
    signupEpic,
    newsfeedEpic,
);

const appReducer = combineReducers({
    router: routerReducer,
    loginPage,
    signupPage,
    newsfeedPage,
    auth,
});

export const rootReducer = (state, action) => {
    if(action.type == 'RESET_REDUX_STATE'){
        state=undefined;
    }

    return appReducer(state, action)
}