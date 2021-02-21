import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { connect } from 'react-redux';
import IconButton from '@material-ui/core/IconButton';
import MoreIcon from '@material-ui/icons/MoreVert';
import {deleteNote} from '../../../redux/note-reduser';
import style from './noteMenu.module.css';

const NoteMenu = (props) => {
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const setNoteEditMode = () => {
        props.setNoteEditMode(true);
        props.setNoteId(props.noteId);
        handleClose();
    }

    const deleteNote = () => {
        props.deleteNote(props.userId, props.pageId, props.noteId);
        handleClose();
    }

    const setNoteTextEditMode = () => {
        props.setNoteTextEditMode(true);
        props.setNoteId(props.noteId);
        handleClose();
    }

    return (
        <div>
            <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick} className={style.noteMenuBtn} >
                <IconButton edge="end" color="inherit">
                    <MoreIcon />
                </IconButton>
            </Button>
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem onClick={setNoteEditMode}>Color settings</MenuItem>
                <MenuItem onClick={setNoteTextEditMode}>Edit this note</MenuItem>
                <MenuItem onClick={deleteNote} style={{backgroundColor: '#fc8b98'}}>Delete this note</MenuItem>
            </Menu>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        userId: state.auth.userId
    }
}

export default connect(mapStateToProps, {deleteNote})(NoteMenu);