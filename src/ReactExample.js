import React from 'react';
import ReactDom from 'react-dom';
import {SortableContainer, SortableElement} from 'react-sortable-hoc';

const SortableItem = SortableElement(({value}) => <li>{value}</li>);

const SortableList = SortableContainer(({items}) => {
    return (
        <ul>
            {items.map((value, index) =>
                <SortableItem key={`item-${index}`} index={index} value={value} />
            )}
        </ul>
    );
});

class App extends React.Component{
	constructor(){
		super();
		this.state = {items : [1, 2, 3, 4]};
	}

	render(){
		return (
            <SortableList items={this.state.items}/>
        );
	}
}


class PlayerTable extends React.Component{
	render(){
		let players = [];
		for (var i = 0; i <= 5; i++) {
			players.push(i);
		}
		let playerList = players.map(player => {
			return <PlayerRow name={"sid"}/>;
		});

		return(
			<div>
				<table>
					<tbody>
						<tr>
							<th>Name</th>
							<th>Score</th>
						</tr>
						{playerList}
					</tbody>
				</table>	
			</div>
		);
	}
}

class PlayerRow extends React.Component{
	render(){
		return(
			<tr>
				<td>Hello {this.props.name}</td>
				<td> 99 </td>
			</tr>
		);
	}
}




export default App;
