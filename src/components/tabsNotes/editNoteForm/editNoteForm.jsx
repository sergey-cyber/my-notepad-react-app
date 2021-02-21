import React from 'react';
import { Field, reduxForm } from 'redux-form';
import style from './editNoteForm.module.css';

const EditNoteForm = (props) => {

    const closeModalWindol =() => {
        props.setNoteTextEditMode(false);
    }

    return (
        <form onSubmit={props.handleSubmit} className={style.editNoteForm} >
            <span onClick={closeModalWindol}>Close</span> 
            <h2>Edit Note</h2>
            <div>
                <Field name="editNote" component={'input'} placeholder='inter new text' 
                    className={style.editNoteInput} autoFocus={'true'} />
            </div>
            <button type={'submit'} className={style.editNoteBtn} >
                Save
            </button> 
        </form>
    )
}

const EditNoteFormReduxForm = reduxForm({
    form: 'editPageTitle'
})(EditNoteForm);

export default EditNoteFormReduxForm;