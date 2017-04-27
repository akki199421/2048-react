
class IDGenerator{
	constructor(){
		this.length = 8;
		this.timestamp = +new Date;
	}
		 
 	_getRandomInt( min, max ) {
		return Math.floor( Math.random() * ( max - min + 1 ) ) + min;
 	}
	generate() {
		var ts = this.timestamp.toString();
		var parts = ts.split( "" ).reverse();
		var id = "";
		 
		for( var i = 0; i < this.length; ++i ) {
			var index = this._getRandomInt( 0, parts.length - 1 );
			id += parts[index];	 
		}
		return id;
	}	
}

class Tile{
	constructor(value,position){
		this.value = value;
		this.x = position.x;
		this.y = position.y;
		this.merged = true;
		this.moved = false;
		this.ID = new IDGenerator().generate();
	}
	reset(){
		this.moved = false;
		this.merged = false;
	}
	updateMergerd() {
		this.merged = true;
	}
	updateVal(val){
		this.value = val;
	}
	updatePosition(pos){
		this.x = pos.x;
		this.y = pos.y;
	}
	getPosition(){
		return{
			x: this.x,
			y: this.y
		};
	}
	tileMoved(){
		this.moved = true;
	}		
}

export default class Gridclass{
	constructor(size,grid){
		this.pos = {
		 	left: {x:-1,y:0},
		 	right: {x:1,y:0},
		 	up: {x:0,y:-1},
		 	down: {x:0,y:1}
		};
		this.defaultTile = 2;
		this.winnings = 2048;
		this.gridsize = size || 4;
		if(grid){
			//because Tile object does not exist anymore
			this.grid = [];
			this.initPreviousStateGrid(grid);
		}
		else{
			this.grid = [];
		}
	}
	initPreviousStateGrid(oldgrid){
		for(var i=0;i<oldgrid.length;i++){
			if(oldgrid[i]){
				this.grid[i] = this.newTile(oldgrid[i].value,{x:oldgrid[i].x,y:oldgrid[i].y});
			}
			else{
				this.grid[i] = null;
			}
		}
	}
	setWinnigs(arg){
		this.winnings = arg;
	}
	setGridSize(arg){
		this.gridsize = parseInt(arg);
	}
	initEmptyGrid(){
		for(var i = 0;i<this.gridsize*this.gridsize;i++){
			this.grid[i] = null;
		}
	}
	_randomeNumber(num){
			return num[Math.floor((Math.random()*(num.length)))];
	}
	_isAvailableandValid(cell){
		if(this._isValidPosition({x:cell.x,y:cell.y}) && this.grid[this._calcCord({x:cell.x,y:cell.y})]===null)
			return cell;
		return false;
	}
	_findAvailableCells(){
		var cells = [];
		this.grid.forEach( (value, key) => {
			if(value === null)
				cells.push(key);
		});
		return cells;
	};
	_calcXYPos(cell_num) {
		var x_p = Math.floor(cell_num%this.gridsize);
		var y_p = Math.floor((cell_num/this.gridsize));
		return {
			x: x_p,
			y: y_p
		}
	}
	_calcCord(pos){
		return pos.x + (pos.y*this.gridsize);
	}
	_isValidPosition(pos){
		 return pos.x > -1 && pos.y > -1 && pos.x < this.gridsize && pos.y < this.gridsize;
	}
	noCellsLeft(){
	 	return this._findAvailableCells().length === 0;
	}
	buildEmptyGrid(){
		for(var i = 0;i < this.gridsize*this.gridsize; i++){
			this.grid[i] = null;
		}
	}
	resetAll(){
		this.grid.forEach((tile) => {
			if(tile)
			tile.reset(); 
		});
	}
	addNewTile(){
			//find all available cells
		var cells = this._findAvailableCells(),next_cell;
		var pos = {};
		if(cells.length === 0){
			return false;
		}
		else{
			//pick random cell
			next_cell = this._randomeNumber(cells);
			//find x y
			pos = this._calcXYPos(next_cell);
			var tile = this.newTile(this.defaultTile,pos);

			//add it into the grid
			this.grid[next_cell] = tile;
				return true;
		}
	}
	newTile(value,pos){
		return new Tile(value,pos);
	}
	calculateTraverseArray(key){
		var pos = {
				x: [],
				y: []
			};
		for(let i=0;i<this.gridsize;i++){
			pos.x.push(i);
			pos.y.push(i);
		}
		switch(key){
			case "right":
			pos.x = pos.x.reverse();
			break;
			case "down":
			pos.y = pos.y.reverse();
			break;
		}
		return pos;
	}
	findTile(x,y){
		return this.grid[this._calcCord({x:x,y:y})];
	}
	calculateNextPos(key,tile){
		let pos = tile.getPosition(),next;
		let curr_x = this.pos[key].x;
		let curr_y = this.pos[key].y;
		do
		{
			next = pos;
			pos = {
				x: next.x + curr_x,
				y: next.y + curr_y
			};
		}while(this._isAvailableandValid(pos));

		return{
			pos : next,
			next: this.cellAt(pos)
		}
	}
	cellAt(tile){
		var pos = {x:tile.x,y:tile.y};
		var cord = this._calcCord(pos);
		if(this._isValidPosition(pos))
			if(this.grid[cord]!==null)
				return this.grid[cord];
		return false;
	}
	moveTile(tile,pos){
		var old_pos = tile.getPosition();
		this.grid[this._calcCord({x:old_pos.x,y:old_pos.y})] = null;
		this.grid[this._calcCord({x:pos.x,y:pos.y})] = tile;
		tile.tileMoved();
		tile.updatePosition(pos);
	}
	updateVal(tile,val){
		tile.updateMergerd();
		tile.updateVal(val);
		return val;
	}
	removeTile(tile){
		this.grid[this._calcCord({x:tile.x,y:tile.y})] = null;
	}
	hasWon(new_value){
		return new_value >= this.winnings;
	}
	comparePos(old,new_p){
		return old.x === new_p.x && old.y === new_p.y;
	}
	noCellsLeft(){
		return this._findAvailableCells().length === 0;
	}
	noMatchLeft(){
		var result = true;
	 	this.grid.forEach((e) => {
	 		Object.keys(this.pos).map((key,index) => {
	 			var n = this.pos[key];
	 			var new_pos = {
	 				x: e.x+n.x,
	 				y: e.y+n.y
	 			};
	 			if(this._isValidPosition(new_pos)){
	 				var new_tile = this.findTile(new_pos.x,new_pos.y);
	 				if(new_tile){
		 				if(new_tile.value === e.value)
		 				{
		 					result = false;
		 				}
		 			}
	 			}
	 		});
	 	});	//End of loop
	 	return result;
	}

}
