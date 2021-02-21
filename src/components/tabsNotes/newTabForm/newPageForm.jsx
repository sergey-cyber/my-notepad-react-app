import React from 'react';
import { Field, reduxForm } from 'redux-form';
import style from './newTabForm.module.css';
import AddIcon from '@material-ui/icons/Add';

const NewPageForm = (props) => {

    const setCreateNewPageMode = () => {
        props.setCreateNewPageMode(false);
    }

    return (
        <form onSubmit={props.handleSubmit} className={style.newPageForm}>
            <div>
                <Field name="newPage" component={'input'} placeholder='inter page title' autoFocus={'true'}
                    className={style.newPageInput} /* onBlur={setCreateNewPageMode} */ />
            </div>
            <button type={'submit'} className={style.newPageBtn} >
                <AddIcon />
            </button>
        </form>
    )
}

const NewPageReduxForm = reduxForm({
    form: 'createNewNote' // a unique identifier for this form
  })(NewPageForm);

  export default NewPageReduxForm;