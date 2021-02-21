import {applyMiddleware, combineReducers, createStore} from 'redux';
import thunkMiddleware from "redux-thunk";  
import { reducer as formReducer } from 'redux-form'
import authReduser from './auth-reduser';
import noteReduser from './note-reduser';
import isLoadingReduser from './isloading-reduser';

let redusers = combineReducers({
    auth: authReduser,
    notes: noteReduser,
    isLoading: isLoadingReduser,
    form: formReducer   //redux-form Lesson 75
});

let store = createStore(redusers, applyMiddleware(thunkMiddleware));
window.store = store;

export default store;