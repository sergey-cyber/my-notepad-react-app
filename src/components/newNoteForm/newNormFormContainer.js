import React from 'react';
import { connect } from 'react-redux';
import NewNoteReduxForm from '../newNoteForm/newNoteForm';
import {setEditModeForNote, addNewNote} from '../../redux/note-reduser';

const NewNoteFormContainer = (props) => {  
    const postNewNote = (formData) => {
        props.addNewNote(props.userId, props.pageId, formData.newNote)
        props.setEditModeForNote(false);
    }
    return (
        <NewNoteReduxForm onSubmit={postNewNote} setEditModeForNote={props.setEditModeForNote} />
    )
}

const mapStateToProps = (state) => {
    return {
        userId: state.auth.userId
    }
}

export default connect(mapStateToProps, {setEditModeForNote, addNewNote})(NewNoteFormContainer);