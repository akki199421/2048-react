import React from 'react';

import Tile from './GridTile';

export default class GridCell extends React.Component{
	render(){	
		const { gridSize } = this.props;
		var className = "grid-cell game-"+gridSize;
	return(
		<div className={className}></div>
		);	
	}
}
