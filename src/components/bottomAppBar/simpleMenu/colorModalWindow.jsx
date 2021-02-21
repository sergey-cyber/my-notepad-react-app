import React, { useState } from 'react';
import style from '../bottomAppBar.module.css';

const ColorModalWindow = (props) => {

    const [bookmarkColor, setBookmarkColor] = useState(null);
    const [bookmarkTextColor, setBookmarkTextColor] = useState(null);
    const onSubmitTabColorSettings = () => {
        props.setTabColorEditMode(false);
        props.setTabColor(props.userId, props.pageId, bookmarkColor, bookmarkTextColor);
    }
    const closeModalWindol = () => {
        props.setTabColorEditMode(false);
    }
  
    return (
        <div className={style.setTabColor}>
            <span onClick={closeModalWindol}>Close</span>      
            <div className={style.setColorItem}>
                <input type='color' name="BookmarkColor"
                    value={bookmarkColor} onChange={e => setBookmarkColor(e.target.value)} />
                <label for='pageColor'>Bookmark background color</label>
            </div>
            <div className={style.setColorItem}>
                <input type='color' name="BookmarkTextColor"
                    value={bookmarkTextColor} onChange={e => setBookmarkTextColor(e.target.value)}  />
                <label for='pageColor'>Bookmark text color</label>
            </div>
            <button onClick={onSubmitTabColorSettings}>Save</button>
        </div>
    )
}
      
export default ColorModalWindow;