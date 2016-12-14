import React from 'react';
import ReactDom from 'react-dom';


const FilterLink = (props) => {
	let st = props.store;
	return (
		<a href="#" onClick={ e => {
			e.preventDefault();
			st.dispatch({
				type: 'SET_VISIBILITY_FILTER',
				filter: props.filter
			});
		}}
		>
			{props.children}
		</a>);
};



const AddToDo = (props) => {
	let st = props.store;
	let inputField = undefined;
	const disp = () => {
		st.dispatch({
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

class VisibleTodoList extends React.Component{
	constructor(props){
		super(props);
		this.store = props.store;
		this.getFilteredTodos.bind(this);
	}

	componentDidMount(){
		this.unsubscribe = this.store.subscribe(() => this.forceUpdate());
	}
	componentWillUnmount(){
		this.unsubscribe();
	}

	getFilteredTodos () {
		return this.store.getState().todos.filter(todo =>{
			switch(this.store.getState().visibilityFilter){
				case 'SHOW_ALL':
					return true;
				case 'SHOW_ACTIVE':
					return todo.completed ? false : true;
				case 'SHOW_COMPLETED':
					return todo.completed ? true : false;
			}
		});
	}

	render(){
		const props = this.props;
		const state = this.store.getState();

		return(
			<TodoList onClickFn={(id) => {
				this.store.dispatch({
					type: 'TOGGLE_TODO',
					id
				});
			}}
			list={this.getFilteredTodos()}/>
		);
	}

}

const Footer = (props) =>{
	let st = props.store;
	return(
		<div>
			<p>
				Show: 
				<FilterLink store={st} filter='SHOW_ALL'>All</FilterLink>,
				<FilterLink store={st} filter='SHOW_ACTIVE'> Active</FilterLink>,
				<FilterLink store={st} filter='SHOW_COMPLETED'> Completed</FilterLink>
			</p>
		</div>
	);
};

var nextTodoId = 0;
class Todo extends React.Component{
	render(){
		let st = this.props.store;
		return(
			<div>
				<AddToDo store={st} />
				<VisibleTodoList store={st}/>
				<Footer store={st}/>
			</div>
		);
	}
}

Todo.defaultProps = {
	list: []
};

export default Todo;