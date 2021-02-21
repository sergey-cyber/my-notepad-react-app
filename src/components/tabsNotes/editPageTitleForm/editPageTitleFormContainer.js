import React from 'react';
import { connect } from 'react-redux';
import EditPageTitleFormReduxForm from './editPageTitleForm';
import {editPageTitle} from '../../../redux/note-reduser';

 const EditPageTitleFormContainer = (props) => {
    const submitNewPageTitle = (formData) => {
        props.editPageTitle(props.userId, props.pageId, formData.editPageTitle);
        props.setPageTitleEditMode(false);
    }

    return (
        <EditPageTitleFormReduxForm onSubmit={submitNewPageTitle} setPageTitleEditMode={props.setPageTitleEditMode} />
    )
}

const mapStateToProps = (state) => {
    return {
        userId: state.auth.userId
    }
}

export default connect(mapStateToProps, {editPageTitle})(EditPageTitleFormContainer); 