import React from 'react';
import ReactDOM from 'react-dom';
import Counter from './Counter';
import Todo from './Todo';

import {createStore, combineReducers} from 'redux';

const todo = (state, action) => {
	switch(action.type){
		case 'ADD_TODO':
			return{
				id : action.id,
				text : action.text,
				completed: false
			};

		case 'TOGGLE_TODO':
			if(state.id !== action.id) {
				return state;
			}
			return {
				...state,
				completed: !state.completed
			};
		default:
			return state;
	}
};



const todos = (state = [], action) => {
	switch(action.type){
		case 'ADD_TODO':
			return[
				...state,
				todo(undefined, action)
			];
		case 'TOGGLE_TODO':
			return state.map(t => todo	(t, action));
		default:
			return state;
	}
};

const visibilityFilter = 
(state = 'SHOW_ALL', action) => 
{
	switch(action.type){
		case 'SET_VISIBILITY_FILTER':
			return action.filter;
		default:
			return state;
	}
};
const todoApp = combineReducers({
	todos,
	visibilityFilter
});

const store = createStore(todoApp);

const getFilteredTodos = () => {
	return store.getState().todos.filter(todo =>{
		switch(store.getState().visibilityFilter){
			case 'SHOW_ALL':
				return true;
			case 'SHOW_ACTIVE':
				return todo.completed ? false : true;
			case 'SHOW_COMPLETED':
				return todo.completed ? true : false;
		}
	});
};

const addToDo = (id, text) => {
	store.dispatch({
		type: 'INCREMENT',
		id: id,
		text: text
	});
};


const render = () => {
	const filteredTodos = getFilteredTodos(); 
	ReactDOM.render(
		<Todo 
		list = {filteredTodos}
		store={store}/>,
		document.getElementById('root')
	);};

render();
store.subscribe(render);


