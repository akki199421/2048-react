import React from 'react';

export default class Tile extends React.Component{
	render(){
		const { value,x,y } = this.props.tile;
		const { gridSize } = this.props;
		var className = "tile-cell game-"+gridSize+" tile-"+value+" pos-"+x+"-"+y;
		return(
			<div class={className}>
				<div class="tile-inner">{value}</div>
			</div>
			)
	}
}
