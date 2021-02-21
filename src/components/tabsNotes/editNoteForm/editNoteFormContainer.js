import React from 'react';
import { connect } from 'react-redux';
import EditNoteFormReduxForm from './editNoteForm';
import {editNoteText} from '../../../redux/note-reduser';

 const EditNoteFormContainer = (props) => {
    const page = [...props.pages].find((el)=> el._id === props.pageId);
    const note = page.notes.find((el) => el._id === props.noteId);
    const initialValue = note.content;
    const submitEditedNoteText = (formData) => {
        props.editNoteText(props.userId, props.pageId, props.noteId, formData.editNote);
        props.setNoteTextEditMode(false);
    }

    return (
        <EditNoteFormReduxForm onSubmit={submitEditedNoteText} setNoteTextEditMode={props.setNoteTextEditMode} 
            initialValues={{editNote: initialValue}} />
    )
}

const mapStateToProps = (state) => {
    return {
        userId: state.auth.userId,
        pages: state.notes.pages
    }
}

export default connect(mapStateToProps, {editNoteText})(EditNoteFormContainer); 