import React from 'react';
import $ from 'jquery';

export default class Tile extends React.Component{
	constructor(props){
		super(props);
		this.gridd = null;
	}
	componentDidUpdate(){
		//clone recieved props for later state comparison
		this.gridd = {
			tile: this.props.tile.map((t) => {return $.extend({},t);}),
			gridSize: this.props.gridSize
		}
	}
	serialize(){
		return {
			gridSize : this.gridSize,
			tile: this.tile
		};
	}
	render(){
		var newGrid = this.props;
		var oldGrid = this.gridd;
		const { gridSize } = newGrid;		
		function pseudoFlatten() {
		  return [].concat.apply([], arguments);
		}
		//find tile 
		function checkID(grid,id){
			return grid.filter((o) => {
				if (o && o.ID === id)
					return o;
			});
		}
		function classes(old_tile,x,y){
			var classes = [];
			if(old_tile.x !== x)
				classes.push('column_from_'+old_tile.x+'_to_'+x);
			if(old_tile.y !== y)
				classes.push('row_from_'+old_tile.y+'_to_'+y);
			return classes;
		}
		function saveOldGrid(){
			this.gridd = newGrid;
		}
		return(
			<div>
			{
				pseudoFlatten(this.props.tile.map((n) => {
					if(n){
						let { value,x,y,ID,merged } = n,old_tile,classe = ['tile-cell'];
						if(oldGrid)
							{
								old_tile = checkID(oldGrid.tile,ID);
								if(old_tile[0]){
									classe.push(classes(old_tile[0],x,y));
								}
						}
						if(value){
							if(merged)
								classe.push('tile-merged');
							classe.push('game-'+gridSize);
							classe.push('tile-'+value);
							classe.push('position_'+y+"_"+x);
							var final_classes = classe.join(' ');
							return([
								<div className={final_classes}><div className="tile-inner">{value}</div></div>
								])
						}
					}
				}))
			}
			</div>
		);

	}
}
