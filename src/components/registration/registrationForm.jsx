import React from 'react';
import style from './registration.module.css';
import { Field, reduxForm } from 'redux-form';
import TextField from '@material-ui/core/TextField';
import asyncValidate from './asyncValidate';
import { NavLink, Route } from 'react-router-dom';
import {SmallPreloader} from '../common/preloader/preloader';

const LoginButton = (props) => {
  return (
    <>
      <button type="submit" disabled={props.pristine || props.submitting || props.isLoading} className={style.loginButton} >
        {props.isLoading ? <SmallPreloader /> : 'Login'} 
      </button>
      <div>
        <NavLink variant="contained" to={'/registration'} >
          Go to registration
        </NavLink>
      </div>
    </>
  )
}

const RegistrationButton = (props) => {
  return (
    <>
      <button type="submit" disabled={props.pristine || props.submitting || props.isLoading} className={style.regButton} >
        {props.isLoading ? <SmallPreloader /> : 'Registration'} 
      </button>
      <div>
        <NavLink variant="contained" to={'/login'} >
          Go to login
        </NavLink>
      </div>
    </>
  )
}

const validate = values => {
  const errors = {}
  const requiredFields = [
    'login',
    'password'
  ]
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = 'Required'
    }
  })
  if (
    values.email &&
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
  ) {
    errors.email = 'Invalid email address'
  }
  return errors
}

const renderTextField = ({
  label,
  input,
  meta: { touched, invalid, error },
  ...custom
}) => (
  <TextField
    label={label}
    placeholder={label}
    error={touched && invalid}
    helperText={touched && error}
    {...input}
    {...custom}
  />
);

const MaterialUiForm = (props) => {
  const { handleSubmit, pristine, submitting } = props;
  
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <Field name="login" component={renderTextField} label="Login or E-mail"/>
      </div>
      <div>
        <Field name="password" component={renderTextField} label="Password" />
      </div>
      <div className = {style.error}>
        {props.regOrLogErrorValue}
      </div>
      <div>
        <Route path={'/login'} render={()=> <LoginButton pristine={pristine} submitting={submitting} 
            isLoading={props.isLoading} /> } />
        <Route path={'/registration'} render={()=> <RegistrationButton pristine={pristine} submitting={submitting}
            isLoading={props.isLoading} /> } />
      </div>
    </form>
  )
}

export const RegistrationReduxForm = reduxForm({
  form: 'MaterialUiForm', // a unique identifier for this form
  validate,
  asyncValidate
})(MaterialUiForm)
