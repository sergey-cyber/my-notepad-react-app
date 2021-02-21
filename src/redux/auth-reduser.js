import { authAPI } from "../API/api";

const IS_AUTH = 'IS_AUTH';
const REG_OR_LOG_ERROR = 'REG_OR_LOG_ERROR';
const SET_LOADING = 'SET_LOADING';
const IS_REGISTER = 'IS_REGISTER';

let initialState = {
    userId: null,
    isAuth: false,
    regOrLogErrorValue: null,   
    isLoading: false,
    isRegister: false //for open and close modal Window about completed registration
}

const authReduser = (state = initialState, action) => {
    switch(action.type) {
        case IS_AUTH:
            return {
                ...state,   
                userId: action.userId,
                isAuth: action.isAuth
            };
        case REG_OR_LOG_ERROR:
            return{
                ...state,   
                regOrLogErrorValue: action.error
            };
        case SET_LOADING:
            return{
                ...state,   
                isLoading: action.isLoading
            };
        case IS_REGISTER:
        return{
            ...state,   
            isRegister: action.isRegister
        };
        default:
            return state;
    }
}

//Action Creators
export const setAuthDataInState = (userId, isAuth) =>  ({type: IS_AUTH, userId, isAuth});
const regOrLogErrorData = (error) =>  ({type: REG_OR_LOG_ERROR, error});
const setLoading = (isLoading) =>  ({type: SET_LOADING, isLoading});
export const setRegistrationModalWindow = (isRegister) =>  ({type: IS_REGISTER, isRegister});

//Thunks

export const setAuth = () => {
    const userId = localStorage.getItem('id');
    return (dispatch) => {
        authAPI.me(userId)
            .then(response => {     
                if(response.id) {                  
                    dispatch(setAuthDataInState(response.id, true));
                    dispatch(setLoading(false));
                } else {
                    dispatch(setAuthDataInState(null, false));
                    dispatch(setLoading(false));
                }           
            });
    }
}  

export const registration = (login, password) => {
    return (dispatch) => {
        dispatch(setLoading(true));
        authAPI.registration(login, password)
            .then(response => {     
                if(response.result === 'ok') {        
                    dispatch(setRegistrationModalWindow(true)); 
                    dispatch(regOrLogErrorData(null)); 
                    dispatch(setLoading(false));           
                } else {
                    dispatch(regOrLogErrorData(response.error));  
                    dispatch(setLoading(false));                 
                }           
            });
    }
}

export const login = (login, password) => {
    return (dispatch) => {
        dispatch(setLoading(true));
        authAPI.login(login, password)
            .then(response => {     
                if(response.result === 'ok') {
                    localStorage.setItem('id', response.userId);                  
                    dispatch(setAuth());
                    dispatch(regOrLogErrorData(null)); 
                    dispatch(setLoading(false));
                } else {
                    dispatch(regOrLogErrorData(response.error));
                    dispatch(setLoading(false)); 
                }            
            });
    }
}

export const logout = (userId) => {
    return (dispatch) => {
        authAPI.logout(userId)
            .then(response => {     
                if(response.result === 'ok') {  
                    delete localStorage.id;                
                    dispatch(setAuth());
                }            
            });
    }
}

/* 
export const logout = (id) => {
    return (dispatch) => {
        //dispatch(regOrLogIsCompleted(false));
        authAPI.logout(id)
            .then(response => {     
                if(response.result === 'ok') {  
                    delete localStorage.id;                
                    dispatch(setAuth());
                    //dispatch(regOrLogIsCompleted(true));
                }            
            });
    }
}  */

export default authReduser;