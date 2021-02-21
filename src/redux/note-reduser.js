import { notesAPI, pagesAPI } from "../API/api";
import {setPageIsCreate, setNoteIsCreate} from './isloading-reduser';

const SET_PAGES_IN_STATE = 'SET_PAGES_IN_STATE';
const SET_EDIT_MODE = 'SET_EDIT_MODE';
const SET_CREATE_NEW_PAGE_MODE = 'SET_CREATE_NEW_PAGE_MODE';
const SET_NEW_PAGE_IN_STATE = 'SET_NEW_PAGE_IN_STATE';
const SET_NEW_NOTE_IN_STATE = 'SET_NEW_NOTE_IN_STATE';
const SET_TAB_COLOR_EDIT_MODE = 'SET_TAB_COLOR_EDIT_MODE';
const SET_TAB_COLOR = 'SET_TAB_COLOR';
const SET_NOTE_COLOR = 'SET_NOTE_COLOR';
const DELETE_PAGE = 'DELETE_PAGE'; 
const DELETE_NOTE = 'DELETE_NOTE';
const SET_NEW_PAGE_TITLE = 'SET_NEW_PAGE_TITLE';
const SET_NEW_NOTE_TEXT = 'SET_NEW_NOTE_TEXT';

let initialState = {
    pages: [],
    editMode: false,
    createNewPageMode: false,
    tabColorEditMode: false
}

const noteReduser = (state = initialState, action) => {
    switch(action.type) {
        case SET_PAGES_IN_STATE:
        return{
            ...state,   
            pages: [...action.pages]
        };
        case SET_EDIT_MODE:
        return{
            ...state,   
            editMode: action.isActivate
        };
        case SET_TAB_COLOR_EDIT_MODE:
        return{
            ...state,   
            tabColorEditMode: action.isActivate
        };
        case SET_CREATE_NEW_PAGE_MODE:
        return{
            ...state,   
            createNewPageMode: action.isActivate
        };
        case SET_NEW_PAGE_IN_STATE:
        return{
            ...state,   
            pages: [...state.pages, action.page]
        };
        case SET_NEW_NOTE_IN_STATE: {
            const page = state.pages.find( (page) => page._id === action.pageId );
            page.notes.push(action.note);
            const updatedPages = state.pages.map((el) => {
                return el._id === action.pageId ? page : el;  
            });
            return{
                ...state,   
                pages: [...updatedPages]
            };
        }      
        case SET_TAB_COLOR: {
            const updatedPages = state.pages.map((el) => {
                return el._id === action.pageId ? action.page : el;  
            });
            return{
                ...state,   
                pages: [...updatedPages]
            };
        }
        case SET_NOTE_COLOR: {
            const updatedPages = state.pages.map((el) => {
                return el._id === action.pageId ? action.page : el;  
            });
            return{
                ...state,   
                pages: [...updatedPages]
            };
        }
        case DELETE_PAGE: {
            const updatedPages = state.pages.filter((el) => {
                return el._id !== action.pageId;  
            });
            return{
                ...state,   
                pages: [...updatedPages]
            };
        }    
        case SET_NEW_PAGE_TITLE: {
            const page = state.pages.find((el) => el._id === action.pageId);
            page.title = action.newPageTitle;
            const updatedPages = state.pages.map((el) => {
                return el._id === action.pageId ? page : el;  
            });
            return{
                ...state,   
                pages: [...updatedPages]
            };
        }
        case DELETE_NOTE: {
            const page = state.pages.find((el) => el._id === action.pageId);
            const notes = page.notes.filter((el) => el._id !== action.noteId);
            page.notes = notes;
            const updatedPages = state.pages.map((el) => {
                return el._id === action.pageId ? page : el;  
            });
            return{
                ...state,   
                pages: [...updatedPages]
            };    
        }
        case SET_NEW_NOTE_TEXT: {
            const page = state.pages.find((el) => el._id === action.pageId);
            const notes = page.notes.map((note) => {
                if(note._id === action.noteId) {
                    return {...note, content: action.newNoteText}
                } else {return note}
            })
            const updatedPages = state.pages.map((el) => {
                if(el._id === action.pageId) {
                    return {...el, notes: notes}
                } else {return el}
            });
            return{
                ...state,   
                pages: [...updatedPages]
            };
        }
        default:
            return state;
    }
}

//Action Creators

const setAllPagesInState = (pages) =>  ({type: SET_PAGES_IN_STATE, pages}); 
export const setEditModeForNote = (isActivate) =>  ({type: SET_EDIT_MODE, isActivate}); 
export const setCreateNewPageMode = (isActivate) =>  ({type: SET_CREATE_NEW_PAGE_MODE, isActivate}); 
const setNewPageInState = (page) =>  ({type: SET_NEW_PAGE_IN_STATE, page}); 
const setNewNoteInState = (pageId, note) =>  ({type: SET_NEW_NOTE_IN_STATE, pageId, note}); 
export const setTabColorEditMode = (isActivate) =>  ({type: SET_TAB_COLOR_EDIT_MODE, isActivate});
const setTabColorInState = (pageId, page) =>  ({type: SET_TAB_COLOR, pageId, page}); 
const deletePageInState = (pageId) =>  ({type: DELETE_PAGE, pageId});
const deleteNoteInState = (pageId, noteId) =>  ({type: DELETE_NOTE, pageId, noteId});
const setNoteColorInState = (pageId, noteId, page) =>  ({type: SET_NOTE_COLOR, pageId, noteId, page}); 
const setNewPageTitleInState = (pageId, newPageTitle) =>  ({type: SET_NEW_PAGE_TITLE, pageId, newPageTitle}); 
const setNewNoteTextInState = (pageId, noteId, newNoteText) =>  ({type: SET_NEW_NOTE_TEXT, pageId, noteId, newNoteText}); 

//Thunks

export const getAllPages = (userId) => {
    return async (dispatch) => {
        let response = await pagesAPI.getPages(userId);                  
        dispatch(setAllPagesInState(response));        
    }
}  

export const addNewPage = (userId, pageTitle) => {
    setPageIsCreate(false);
    return async (dispatch) => {
        let response = await pagesAPI.postNewPage(userId, pageTitle);                      
        dispatch(setNewPageInState(response)); 
        setPageIsCreate(true);       
    }
} 

export const addNewNote = (userId, pageId, noteContent) => {
    setNoteIsCreate(false);
    return async (dispatch) => {
        let response = await notesAPI.postNewNote(userId, pageId, noteContent);                     
        dispatch(setNewNoteInState(pageId, response)); 
        setNoteIsCreate(true);       
    }
} 

export const setTabColor = (userId, pageId, tabColor, tabTextColor) => {
    return async (dispatch) => {
        let response = await pagesAPI.setTabColor(userId, pageId, tabColor, tabTextColor);                    
        dispatch(setTabColorInState(pageId, response));        
    }
} 

export const deletePage = (userId, pageId) => {
    return async (dispatch) => {
        let response = await pagesAPI.deletePage(userId, pageId);           
        if(response.result === 'ok') {
            dispatch(deletePageInState(pageId));  
        }                              
    }
} 

export const deleteNote = (userId, pageId, noteId) => {
    return async (dispatch) => {
        let response = await notesAPI.deleteNote(userId, pageId, noteId);          
        if(response.result === 'ok') {
            dispatch(deleteNoteInState(pageId, noteId));  
        }                              
    }
} 

export const setNoteColor = (userId, pageId, noteId, noteColor, noteTextColor) => {
    return async (dispatch) => {
        let response = await notesAPI.setNoteColor(userId, pageId, noteId, noteColor, noteTextColor);                    
        dispatch(setNoteColorInState(pageId, noteId, response));        
    }
} 

export const editPageTitle = (userId, pageId, newPageTitle) => {
    return async (dispatch) => {
        let response = await pagesAPI.editPageTitle(userId, pageId, newPageTitle);                
        dispatch(setNewPageTitleInState(pageId, response));        
    }
} 

export const editNoteText = (userId, pageId, noteId, newNoteText) => {
    return async (dispatch) => {
        let response = await notesAPI.editNoteText(userId, pageId, noteId, newNoteText);                
        dispatch(setNewNoteTextInState(pageId, noteId, response));        
    }
} 

export default noteReduser;