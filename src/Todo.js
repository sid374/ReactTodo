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
				if(e.keyCode == 13)
					disp();
			}} type="text">
		</input>
		<button onClick={disp}>
			Add todo
		</button>
	</div>
	);
			
};

const TodoList = (props) =>{
	let st = props.store;
	return(
		<div>
			<ul>
				{props.list.map(function(value){
					return <li onClick={() => {
						st.dispatch({
							type: 'TOGGLE_TODO',
							id: value.id
						});
					}} key={value.id} style={{textDecoration: value.completed ? 'line-through' : ''}}>{value.text}</li>;
				})}
			</ul>
		</div>
	);
};

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
				<TodoList store={st} list={this.props.list}/>
				<Footer store={st}/>
			</div>
		);
	}
}

Todo.defaultProps = {
	list: []
};

export default Todo;