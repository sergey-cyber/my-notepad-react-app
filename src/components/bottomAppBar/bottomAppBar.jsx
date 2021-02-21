import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { connect } from 'react-redux';
import {setEditModeForNote} from '../../redux/note-reduser';
import {logout} from '../../redux/auth-reduser';
import SimpleMenu from './simpleMenu/simpleMenu';

const useStyles = makeStyles((theme) => ({
  text: {
    padding: theme.spacing(2, 2, 0),
  },
  paper: {
    paddingBottom: 50,
  },
  list: {
    marginBottom: theme.spacing(2),
  },
  subheader: {
    backgroundColor: theme.palette.background.paper,
  },
  appBar: {
    top: 'auto',
    bottom: 0,
  },
  grow: {
    flexGrow: 1,
  },
  fabButton: {
    position: 'absolute',
    zIndex: 1,
    top: -30,
    left: 0,
    right: 0,
    margin: '0 auto',
  },
  exitBtn: {
    textDecoration: 'underline'
  }
}));

const BottomAppBar = (props) => {
  const classes = useStyles();

  const activateEditMode = () => {
    props.setEditModeForNote(true);
  }

  const logout = () => {
    props.logout(props.userId);
  }

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="fixed" color="primary" className={classes.appBar}>
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="open drawer">
            <SimpleMenu pageId={props.pageId} setPageTitleEditMode={props.setPageTitleEditMode} />
          </IconButton>
          <Fab color="secondary" aria-label="add" className={classes.fabButton} onClick={activateEditMode} >
            <AddIcon />
          </Fab>
          <div className={classes.grow} />
          <IconButton color="inherit" className={classes.exitBtn} onClick={logout} >
            Exit
          </IconButton>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
}

const mapStateToProps = (state) => {
  return {
    userId: state.auth.userId
  }
}

export default connect(mapStateToProps, {setEditModeForNote, logout})(BottomAppBar);
