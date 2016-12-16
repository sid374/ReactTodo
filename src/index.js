import React from 'react';
import ReactDOM from 'react-dom';
import Counter from './Counter';
import TodoApp from './Todo';

import { createStore, combineReducers } from 'redux';
import { Provider, connect } from 'react-redux';

const todoReducer = (state, action) => {
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
			let retVal = [
				...state,
				todoReducer(undefined, action)
			];
			return retVal;
		case 'TOGGLE_TODO':
			return state.map(t => todoReducer	(t, action));
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

const todoAppReducer = combineReducers({
	todos,
	visibilityFilter
});

const getFilteredTodos  = (allTodos, visFilter) => {
	return allTodos.filter(todo =>{
		switch(visFilter){
			case 'SHOW_ALL':
				return true;
			case 'SHOW_ACTIVE':
				return todo.completed ? false : true;
			case 'SHOW_COMPLETED':
				return todo.completed ? true : false;
		}
	});
};



const render = () => {
	ReactDOM.render(
		<Provider store={createStore(todoAppReducer)}>
			<TodoApp />
		</Provider>,
		document.getElementById('root')
	);};

render();
//store.subscribe(render);


