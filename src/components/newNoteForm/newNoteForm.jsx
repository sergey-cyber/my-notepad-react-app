import React from 'react';
import { Field, reduxForm } from 'redux-form';
import style from './newNoteForm.module.css';
import AddIcon from '@material-ui/icons/Add';

const newNoteForm = (props) => {

    const setEditModeForNote = () => {
        props.setEditModeForNote(false);
    }

    return (
        <form onSubmit={props.handleSubmit} className={style.newNoteForm} >
            <div>
                <Field name="newNote" component={'input'} placeholder='inter your note' 
                    className={style.newNoteInput} autoFocus={'true'} /* onBlur={setEditModeForNote} */ />
            </div>
            <button type={'submit'} className={style.newNoteBtn} >
                <AddIcon />
            </button>
        </form>
    )
}

const NewNoteReduxForm = reduxForm({
    form: 'createNewNote', // a unique identifier for this form
  })(newNoteForm);

  export default NewNoteReduxForm;
