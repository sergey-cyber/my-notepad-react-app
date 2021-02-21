import React, { useEffect } from 'react';
import './App.css';
import Registration from './components/registration/registration';
import ScrollableTabsButtonAuto from './components/tabsNotes/tabsNotes';
import { compose } from 'redux';
import { connect } from 'react-redux';
import {setAuth} from './redux/auth-reduser';

const App = (props) => {

  useEffect(()=>{
     props.setAuth();
  },[]);
  
  return (
    <div className="App">
        { !props.isAuth ? 
          
          <Registration /> 
        :
        <>
          <ScrollableTabsButtonAuto /> 
        </>
        }
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    isAuth: state.auth.isAuth
  }
}

export default compose (
  connect(mapStateToProps, { setAuth }))(App);

