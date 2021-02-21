import * as axios from 'axios';

const instance = axios.create({ 
   // withCredentials: true,    почему то не работает если это раскоментить
    baseURL: 'https://thawing-earth-93038.herokuapp.com/myNotepad/',
    headers: {

    }    
});

export const authAPI = {
    me(userId) {       
        return instance.get('/me/' + userId) 
        .then(response => {
                return response.data;  
            });
    },
    registration(login, password) {  // Создает объект User на сервере
        return instance.post('/registration', {login, password}) 
        .then(response => {
                return response.data;  
            });
    },
    login(login, password) {    // Только меняет isAuth на сервере
        return instance.patch('/login', {login, password}) 
        .then(response => {
                return response.data;  
            });
    },
    logout(userId) {    // Только меняет isAuth на сервере
        return instance.patch('/logout', {userId}) 
        .then(response => {
                return response.data;  
            });
    }
} 

export const pagesAPI = {
    getPages(userId) {       
        return instance.get('/pages/' + userId) 
        .then(response => {
                return response.data;  
            });
    },
    postNewPage (userId, pageTitle) {  
        return instance.post('/pages/' + userId, {pageTitle}) 
        .then(response => {
                return response.data;  
            });
    },
    setTabColor (userId, pageId, tabColor, tabTextColor) {  
        return instance.patch('/pages/' + userId, {pageId, tabColor, tabTextColor}) 
        .then(response => {
                return response.data;  
            });
    },
    deletePage (userId, pageId) {  
        return instance.delete(`pages/${userId}/${pageId}`) 
        .then(response => {
                return response.data;  
            });
    },
    editPageTitle (userId, pageId, newPageTitle) {  
        return instance.patch('pages/editPageTitle/'+userId, {pageId, newPageTitle}) 
        .then(response => {
                return response.data;  
            });
    }
};

export const notesAPI = {
    postNewNote (userId, pageId, noteContent) {  
        return instance.post('/notes/' + userId, {pageId, noteContent}) 
        .then(response => {
                return response.data;  
            });
    },
    deleteNote (userId, pageId, noteId) {  
        return instance.delete(`notes/${userId}/${pageId}/${noteId}`) 
        .then(response => {
                return response.data;  
            });
    },
    setNoteColor(userId, pageId, noteId, noteColor, noteTextColor) {  
        return instance.patch('/notes/' + userId, {pageId, noteId, noteColor, noteTextColor}) 
        .then(response => {
                return response.data;  
            });
    },
    editNoteText (userId, pageId, noteId, newNoteText) {  
        return instance.patch('notes/editNoteText/'+userId, {pageId, noteId, newNoteText}) 
        .then(response => {
                return response.data;  
            });
    }
}


/* 
export const todosAPI = {
    getAllTodos (id) {  
        return instance.get('/todos/'+id) 
        .then(response => {
                return response.data;  
            });
    },
    postNewTodo (id, content) {  
        return instance.post('todos/'+id, {content}) 
        .then(response => {
                return response.data;  
            });
    },
    deleteTodo (id, todoId) {  
        return instance.delete(`todos/${id}/${todoId}`) 
        .then(response => {
                return response.data;  
            });
    },
    updateTodo(id, content, todoId) {
        return instance.patch('todos/'+id, {content, todoId}) 
        .then(response => {
                return response.data;  
            });
    },
    completedTodo(id, todoId) {
        return instance.patch('completed/'+id, {todoId}) 
        .then(response => {
                return response.data;  
            });
    }
};

export const authAPI = {
    me(userId) {       
        return instance.get('/me/' + userId) 
        .then(response => {
                return response.data;  
            });
    },
    registration(login, password) {  // Создает объект User на сервере
        return instance.post('/registration', {login, password}) 
        .then(response => {
                return response.data;  
            });
    },
    login(login, password) {    // Только меняет isAuth на сервере
        return instance.patch('/login', {login, password}) 
        .then(response => {
                return response.data;  
            });
    },
    logout(id) {    // Только меняет isAuth на сервере
        return instance.patch('/logout', {id}) 
        .then(response => {
                return response.data;  
            });
    }
} */