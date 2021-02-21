import React from 'react';
import { Field, initialize, reduxForm } from 'redux-form';
import style from './editPageTitleForm.module.css';

const EditPageTitleForm = (props) => {

    const closeModalWindol = () => {
        props.setPageTitleEditMode(false);
    }

    return (
        <form onSubmit={props.handleSubmit} className={style.editPageTitleForm} >
            <span onClick={closeModalWindol}>Close</span>
            <h2>Edit page title</h2>
            <div>
                <Field name="editPageTitle" component={'input'} placeholder='inter new title' 
                    className={style.editPageTitleInput} autoFocus={'true'} />
            </div>
            <button type={'submit'} className={style.editPageTitleBtn} >
                Save
            </button> 
        </form>
    )
}

const EditPageTitleFormReduxForm = reduxForm({
    form: 'editPageTitle'
})(EditPageTitleForm);

export default EditPageTitleFormReduxForm;