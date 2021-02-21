
const SET_PAGE_IS_CREATE = 'isLoading/SET_PAGE_IS_CREATE'; 
const SET_NOTE_IS_CREATE = 'isLoading/SET_NOTE_IS_CREATE';

let initialState = {
    pageIsCreate: true,
    noteIscreate: true
}

const isLoadingReduser = (state = initialState, action) => {
    switch(action.type) {
        case SET_PAGE_IS_CREATE:{
            return{
                ...state,   
                pageIsCreate: action.isCreate
            };
        }
        case SET_NOTE_IS_CREATE:
        return{
            ...state,   
            noteIscreate: action.isCreate
        };
        default:
            return state;
    }
}

//Action Creators

//Для отображения прелоадера, пока идет запрос на сервак при создании новой страницы или note 
export const setPageIsCreate = (isCreate) =>  {
    return {type: SET_PAGE_IS_CREATE, isCreate}; 
}
export const setNoteIsCreate = (isCreate) =>  ({type: SET_NOTE_IS_CREATE, isCreate}); 

export default isLoadingReduser;