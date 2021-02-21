import React from 'react';
import style from './tabsNotes.module.css';
import AddIcon from '@material-ui/icons/Add';

export const AddNewPageButton = (props) => {
    const addNewPage = () => {
        props.setCreateNewPageMode(true);
    }
    
    return (
        <button className={style.addNewPageButton} onClick={addNewPage}>
            <AddIcon />
        </button>
    );
}
