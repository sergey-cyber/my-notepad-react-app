import React from 'react';
import style from './registration.module.css';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { RegistrationReduxForm } from './registrationForm';
import { connect } from 'react-redux';
import {registration, login, setRegistrationModalWindow} from '../../redux/auth-reduser';
import { Redirect, Route } from 'react-router-dom';
import RegisterCompletedModal from './registerCompletedModal';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'no-wrap',
    justifyContent: 'center',
    backgroundColor: '#defff2',
    '& > *': {
      margin: theme.spacing(3),
      width: theme.spacing(100),
      height: theme.spacing(100),
    },
  },
}));

const Registration = (props) => {
  const classes = useStyles();

  const login = (formData) => {
   props.login(formData.login, formData.password)
  }
  const registration = (formData) => {
    props.registration(formData.login, formData.password)
  }

  return (
    props.isRegister ? <RegisterCompletedModal setRegistrationModalWindow = {props.setRegistrationModalWindow} /> :
    <div className={classes.root}>
      <Paper elevation={10} >
          <h1 className={style.formTitle}>MyNote</h1>
          <h2 className={style.formTitle}>Log in or register</h2>
          <Route path={'/login'} render={() => <RegistrationReduxForm onSubmit = {login} 
              regOrLogErrorValue={props.regOrLogErrorValue} isLoading={props.isLoading} /> } />  
          <Route path={'/registration'} render={() => <RegistrationReduxForm onSubmit = {registration} 
              regOrLogErrorValue={props.regOrLogErrorValue} isLoading={props.isLoading} /> } /> 
          <Route exact path={'/'}> <Redirect to={'login'} /> </Route>
      </Paper>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    regOrLogErrorValue: state.auth.regOrLogErrorValue,
    isLoading: state.auth.isLoading,
    isRegister: state.auth.isRegister
  }
}

export default connect(mapStateToProps, { registration, login, setRegistrationModalWindow })(Registration)

