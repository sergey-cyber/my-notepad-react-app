import React from 'react';
import { connect } from 'react-redux';
import EditNoteFormReduxForm from './editNoteForm';
import {editNoteText} from '../../../redux/note-reduser';

 const EditNoteFormContainer = (props) => {
    const submitEditedNoteText = (formData) => {
        props.editNoteText(props.userId, props.pageId, props.noteId, formData.editNote);
        props.setNoteTextEditMode(false);
    }

    return (
        <EditNoteFormReduxForm onSubmit={submitEditedNoteText} setNoteTextEditMode={props.setNoteTextEditMode} />
    )
}

const mapStateToProps = (state) => {
    return {
        userId: state.auth.userId
    }
}

export default connect(mapStateToProps, {editNoteText})(EditNoteFormContainer); 