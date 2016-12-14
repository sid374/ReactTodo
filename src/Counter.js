import React from 'react';
import ReactDom from 'react-dom';

class Counter extends React.Component{
	render(){
		return(
			<div>
				{this.props.value}
				<br/>
				<button onClick={this.props.onIncrement}>+</button>
				<button onClick={this.props.onDecrement}>-</button>
			</div>
		);
	}
}

Counter.defaultProps = {
	value: 0
};

export default Counter;