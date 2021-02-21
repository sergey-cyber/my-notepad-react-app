import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Paper from '@material-ui/core/Paper';
import { connect } from 'react-redux';
import { getAllPages, setCreateNewPageMode, setTabColor, setTabColorEditMode } from '../../redux/note-reduser';
import NewNoteFormContainer from '../newNoteForm/newNormFormContainer';
import { AddNewPageButton } from './pagesControlButtons';
import NewPageFormContainer from './newTabForm/newPageFormContainer'
import ColorModalWindow from '../bottomAppBar/simpleMenu/colorModalWindow';
import BottomAppBar from '../bottomAppBar/bottomAppBar';
import NoteMenu from './noteMenu/noteMenu';
import NoteColorForm from './noteMenu/noteColorForm';
import EditPageTitleFormContainer from './editPageTitleForm/editPageTitleFormContainer';
import EditNoteFormContainer from './editNoteForm/editNoteFormContainer';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import {SmallPreloader} from '../common/preloader/preloader';

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  value === index && props.setPageId(props.pages[index]._id); //сетаем в pageId айди активной вкладки

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    'aria-controls': `scrollable-auto-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  list: {
    wordWrap: 'break-word',
    fontStyle: 'italic',
    marginBottom: '50%'
  },
  appBar: {
    position: 'fixed'
  },
  appBarItem: {
    backgroundColor: 'red'
  },
  paper: {
    marginTop: '15%'
  },
  note: {
    borderBottom: '1px solid rgba(0,0,0,.25)',
    margin: '3px',
  },
  text: {
    wordWrap: 'break-word'
  }
}));

/* const messages = [
  {
    id: 1,
    primary: 'Brunch this week?',
    secondary: "I'll be in the neighbourhood this week. Let's grab a bite to eat",
    person: '/static/images/avatar/5.jpg',
  },
]; */

const ScrollableTabsButtonAuto = (props) => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [pageId, setPageId] = useState(null);
  const [noteEditMode, setNoteEditMode] = useState(false);
  const [noteId, setNoteId] = useState(null);
  const [pageTitleEditMode, setPageTitleEditMode] = useState(false);
  const [noteTextEditMode, setNoteTextEditMode] = useState(false);

  useEffect(() => {
    props.getAllPages(props.userId);
  }, []);  

  const handleChange = (event, newValue) => {
    setValue(newValue);
    /* const changedPageId = props.pages[newValue]._id;
    setPageId(changedPageId); */
  };

  return (
    <div className={classes.root}>
      {props.createNewPageMode && <NewPageFormContainer />}
      {props.tabColorEditMode && <ColorModalWindow setTabColor={props.setTabColor}
        userId={props.userId} pageId={pageId} setTabColorEditMode={props.setTabColorEditMode} />}
      {noteEditMode && <NoteColorForm setNoteEditMode={setNoteEditMode} pageId={pageId} noteId={noteId} /> }
      {noteTextEditMode && <EditNoteFormContainer setNoteTextEditMode={setNoteTextEditMode} pageId={pageId} noteId={noteId} /> }
      {pageTitleEditMode && <EditPageTitleFormContainer pageId={pageId} setPageTitleEditMode={setPageTitleEditMode} initialValues={props.pages} />}  
      <AppBar position="static" color="default" className={classes.appBar}>
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
          scrollButtons="auto"
          aria-label="scrollable auto tabs example"
        > 
          { props.pages.length === 0 &&
            <Tab label={'Please, create page'} {...a11yProps(0)} />
          } 
          {props.pages.map((page, index, arr) => {
              return <Tab label={page.title} {...a11yProps(index)} style={{ backgroundColor: page.bookmarkColor }} />   
          })}
          {!props.pageIsCreate && <SmallPreloader /> }
          <AddNewPageButton setCreateNewPageMode={props.setCreateNewPageMode} />  
        </Tabs>
      </AppBar>
      {props.pages.map((page, index) => {
        return <TabPanel value={value} index={index} setPageId={setPageId} pages={props.pages} >
          <Paper square className={classes.paper}>
            <Typography className={classes.text} variant="h5" gutterBottom>
              {page.title}
            </Typography>
          </Paper>
          <List className={classes.list}>
            {page.notes.map((note) => (
              <React.Fragment key={note._id}>
                {/* {id === 1 && <ListSubheader className={classes.subheader}>Today</ListSubheader>}
                {id === 5 && <ListSubheader className={classes.subheader}>Yesterday</ListSubheader>} */}
                <ListItem button className={classes.note} 
                  style={{backgroundColor: note.backgroundColor, color: note.textColor}} >
                  <ListItemText primary={note.content} />
                  <NoteMenu setNoteEditMode={setNoteEditMode} pageId={pageId} noteId={note._id}
                     setNoteId={setNoteId} setNoteTextEditMode={setNoteTextEditMode} />
                </ListItem>
              </React.Fragment>
            ))}
            {props.editMode && <NewNoteFormContainer pageId={pageId} />} 
          </List>
        </TabPanel>
      })}
      <BottomAppBar pageId={pageId} setPageTitleEditMode={setPageTitleEditMode}  />
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    pages: state.notes.pages,
    userId: state.auth.userId,
    editMode: state.notes.editMode,
    createNewPageMode: state.notes.createNewPageMode,
    tabColorEditMode: state.notes.tabColorEditMode,
    pageIsCreate: state.isLoading.pageIsCreate,
    noteIscreate: state.isLoading.noteIscreate
  }
}

export default compose (
  connect(mapStateToProps, { getAllPages, setCreateNewPageMode, setTabColor, setTabColorEditMode }),
  withRouter
)(ScrollableTabsButtonAuto);

