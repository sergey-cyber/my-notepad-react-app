import React from 'react';
import { connect } from 'react-redux';
import EditPageTitleFormReduxForm from './editPageTitleForm';
import {editPageTitle} from '../../../redux/note-reduser';

 const EditPageTitleFormContainer = (props) => {
    const page = [...props.pages].find((el)=> el._id === props.pageId);
    const initialValue = page.title;
    const submitNewPageTitle = (formData) => {
        props.editPageTitle(props.userId, props.pageId, formData.editPageTitle);
        props.setPageTitleEditMode(false);
    }

    return (
        <EditPageTitleFormReduxForm onSubmit={submitNewPageTitle} setPageTitleEditMode={props.setPageTitleEditMode}
            initialValues={{editPageTitle: initialValue}} />
    )
}

const mapStateToProps = (state) => {
    return {
        userId: state.auth.userId,
        pages: state.notes.pages
    }
}

export default connect(mapStateToProps, {editPageTitle})(EditPageTitleFormContainer); 