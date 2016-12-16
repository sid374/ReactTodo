import React from 'react';
import ReactDom from 'react-dom';
import { connect } from 'react-redux';


/*
---------------------------------------------------
ACTION CREATORS
---------------------------------------------------
*/
var nextTodoId = 0;
const addTodo = (text) => {
	return{
		type:'ADD_TODO',
		id: nextTodoId++,
		text
	}
}

const setVisibiltyFilter = (filter) => {
	return{
		type: 'SET_VISIBILITY_FILTER',
		filter
	}
}

const toggleToDo = (id) => {
	return{
		type: 'TOGGLE_TODO',
		id
	};
}



/*
---------------------------------------------------
AddToDo Component
---------------------------------------------------
*/

let AddToDo = (props) => {
	let inputField;
	const disp = () => {
		props.dispatch(addTodo(inputField.value))	;
		inputField.value = '';
	};
	return(
	<div>
		<input ref={node => {
			inputField = node;
			}} onKeyUp={(e) => {
				if(e.keyCode === 13)
					disp();
			}} type="text">
		</input>
		<button onClick={disp}>
			Add todo
		</button>
	</div>
	);
};

AddToDo = connect()(AddToDo);


/*
---------------------------------------------------
TodoList/TodoItem Components
---------------------------------------------------
*/

const TodoItem = (props) =>{
	return(
		<li onClick={() => {
			props.onClickFn(props.id);
		}} style={{textDecoration: props.completed ? 'line-through' : ''}}>
			{props.text}
		</li>
	);
};


const TodoList = (props) =>{
	console.log("TodoList being rendered");
	return(
		<div>
			<ul>
				{props.list.map(function(value){
					return <TodoItem onClickFn={props.onClickFn} 
							id={value.id} completed={value.completed} 
							text={value.text} key={value.id}/>;
				})}
			</ul>
		</div>
	);
};


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

const mapStateToProps = (state) => {
	return {
		list: getFilteredTodos(state.todos, state.visibilityFilter)
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		onClickFn : (id) => {
			dispatch(toggleToDo(id));
		}
	};
};
const VisibleTodoList = connect(
	mapStateToProps,
	mapDispatchToProps
)(TodoList);
	

/*
---------------------------------------------------
Footer/Link Components
---------------------------------------------------
*/


const Link = (props) => {
	if(props.active){
		return <span>{props.children}</span>;
	}
	return (
		<a href="#" onClick={ e => {
			e.preventDefault();
			props.onClick();
		}}>
			{props.children}
		</a>);

};


let Footer = (props) =>{
	return(
		<div>
			<p>
				Show: 
				<FilterLink filter='SHOW_ALL'>All</FilterLink>,
				<FilterLink filter='SHOW_ACTIVE'> Active</FilterLink>,
				<FilterLink filter='SHOW_COMPLETED'> Completed</FilterLink>
			</p>
		</div>
	);
};
const mapStateToLinkProps = (state, ownProps) => {
	return {
		active: ownProps.filter === state.visibilityFilter
	};
};

const mapDispatchToLinkProps = (dispatch, ownProps) => {
	return{
		onClick: () => {
			dispatch(setVisibiltyFilter(ownProps.filter));
		}
	};
};
const FilterLink = connect(mapStateToLinkProps, mapDispatchToLinkProps)(Link);

/*
---------------------------------------------------
Top Level Todo App
---------------------------------------------------
*/

const TodoApp = () => {
	return(
		<div>
			<AddToDo />
			<VisibleTodoList />
			<Footer />
		</div>
	);
};


export default TodoApp;