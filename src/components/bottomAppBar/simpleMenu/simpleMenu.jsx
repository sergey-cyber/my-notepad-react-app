import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MenuIcon from '@material-ui/icons/Menu';
import style from '../bottomAppBar.module.css';
import { connect } from 'react-redux';
import {setTabColorEditMode, deletePage} from '../../../redux/note-reduser'

const SimpleMenu = (props) => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const openSetTabColor = () => {
    handleClose();
    props.setTabColorEditMode(true);
  }
  const deletePage = () => {
    props.deletePage(props.userId, props.pageId);
    handleClose();  
  }

  const openEditPageTitleForm = () => {
    props.setPageTitleEditMode(true);
    handleClose(); 
  }

  return (
    <div>
      <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick} className={style.menuBtn} >
        <MenuIcon className={style.menuBtn} />
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={openSetTabColor}>Bookmark color settings</MenuItem>
        <MenuItem onClick={openEditPageTitleForm}>Edit page title</MenuItem>
        <MenuItem onClick={deletePage}>Delete this page</MenuItem>
      </Menu>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    userId: state.auth.userId
  }
}

export default connect(mapStateToProps, {setTabColorEditMode, deletePage})(SimpleMenu);
