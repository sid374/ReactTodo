import React from 'react';
import ReactDom from 'react-dom';
import { connect } from 'react-redux';


var nextTodoId = 0;

let AddToDo = (props) => {
	let inputField;
	const disp = () => {
		props.dispatch({
			type:'ADD_TODO',
			text: inputField.value,
			id: nextTodoId++
		});
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
			dispatch({
				type: 'TOGGLE_TODO',
				id
			});
		}
	};
};
const VisibleTodoList = connect(
	mapStateToProps,
	mapDispatchToProps
)(TodoList);
	


const mapStateToLinkProps = (state, ownProps) => {
	return {
		active: ownProps.filter === state.visibilityFilter
	};
};

const mapDispatchToLinkProps = (dispatch, ownProps) => {
	return{
		onClick: () => {
			dispatch({
				type: 'SET_VISIBILITY_FILTER',
				filter: ownProps.filter
			});
		}
	};
};

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

const FilterLink = connect(mapStateToLinkProps, mapDispatchToLinkProps)(Link);

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