import React, { useState } from 'react';
import { connect } from 'react-redux';
import style from './noteMenu.module.css';
import {setNoteColor} from '../../../redux/note-reduser';

const NoteColorForm = (props) => {

    const [noteColor, setNoteColor] = useState(null);
    const [noteTextColor, setNoteTextColor] = useState(null);
    const onSubmitNoteColorSettings = () => {
        props.setNoteColor(props.userId, props.pageId, props.noteId, noteColor, noteTextColor);
        props.setNoteEditMode(false);
    }

    const setNoteEditMode = () => {
        props.setNoteEditMode(false);
    }
  
    return (
        <div className={style.setNoteColor}>
            <h2>Note color Settings</h2>
            <span onClick={setNoteEditMode} >Close</span>      
            <div className={style.setColorItem}>
                <input type='color' name="noteColor"
                    value={noteColor} onChange={e => setNoteColor(e.target.value)} />
                <label for='noteColor'>Note background color</label>
            </div>
            <div className={style.setColorItem}>
                <input type='color' name="noteTextColor"
                    value={noteTextColor} onChange={e => setNoteTextColor(e.target.value)}  />
                <label for='noteTextColor'>Note text color</label>
            </div>
            <button onClick={onSubmitNoteColorSettings}>Save</button>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        userId: state.auth.userId
    }
}

export default connect(mapStateToProps, {setNoteColor})(NoteColorForm)
      