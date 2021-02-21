import React from 'react';
import { connect } from 'react-redux';
import NewPageReduxForm from './newPageForm';
import {setCreateNewPageMode, addNewPage} from '../../../redux/note-reduser';

const NewPageFormContainer = (props) => {
    const postNewPage = (formData) => {
        props.addNewPage(props.userId, formData.newPage);
        props.setCreateNewPageMode(false);
    }
    return (
        <NewPageReduxForm onSubmit={postNewPage} setCreateNewPageMode={props.setCreateNewPageMode} />
    )
}

const mapStateToProps = (state) => {
    return {
        setCreateNewPageMode: state.notes.createNewPageMode,
        userId: state.auth.userId
    }
}

export default connect(mapStateToProps, {setCreateNewPageMode, addNewPage})(NewPageFormContainer);