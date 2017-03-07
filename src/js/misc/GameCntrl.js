import Gridclass from './Gridclass';
import LocalStorage from '../components/LocalStorage';


export default class GameCntrl{
	constructor(size){
		this.storage = new LocalStorage();
		this.size = size;
		this.setup(size,this.storage.getGameState());	
	}
	setup(size,previousState){
		if(previousState && size === previousState.gridsize){
			this.gridClass = new Gridclass(previousState.gridsize,previousState.grid);
			this.score = previousState.score;
			this.gameOver = previousState.gameOver;
			this.gameWon = previousState.gameWon;
		}
		else{
			this.gridClass = new Gridclass(size);
			this.gameOver = false;
			this.gameWon = false;
			this.score = 0;
			this.init();
		}
	}
	undoMove(){
		var oldState = this.storage.getPreviousGameState();
		if(oldState){
			this.setup(this.size,oldState);
		}
		//clear previous game states
		this.storage.clearGameState();
		//set old state as current
		this.storage.setGameState(oldState);
	}
	serialize(){
		return{
			gridsize: this.gridClass.gridsize,
			grid: this.gridClass.grid,
			score: this.score,
			gameOver: this.gameOver,
			gameWon: this.gameWon			
		};
	}
	init(){
		//initialize grid
		this.gridClass.initEmptyGrid();
		//add Initial tile
		this.initateGrid();
	}
	initateGrid(){
		 for(var i = 0; i<2; i++)
			this.gridClass.addNewTile();
	}
	updateGameWon(){
		this.gameWon = false;
	}
	move(key){
		let gridCls = this.gridClass;
		//calc traverse direction
		var trav_array = gridCls.calculateTraverseArray(key);
		//reset all tiles
		var insertNewTile = false, won = false;
		gridCls.resetAll();
		trav_array.x.forEach((x) => {
			trav_array.y.forEach((y) => {
				let tile = gridCls.findTile(x,y);
				if(tile){
					let old_pos = {
						x: tile.x,
						y: tile.y
					};
					if(!tile.moved){
						var next_pos = gridCls.calculateNextPos(key,tile);
						let next_cell = next_pos.next;
						if(!next_cell.merged && next_cell && next_cell.value === tile.value)
							{
								//GET THE new tile
								this.score += next_cell.value*2;
								var new_value = gridCls.updateVal(next_cell,(next_cell.value*2));
								gridCls.removeTile(tile);
								won = gridCls.hasWon(new_value);
								insertNewTile = true;
						}
						else{
							gridCls.moveTile(tile,next_pos.pos);
						}
					}
					if(!gridCls.comparePos(old_pos,next_pos.pos))
						insertNewTile = true;
				}
				//end of if tile
			});
		});
		//End of loop

		if(won){
			this.gameWon = true;
		}
		if(insertNewTile){
			gridCls.addNewTile();
			this.storage.setGameState(this.serialize());
		}
		if(gridCls.noCellsLeft()&&gridCls.noMatchLeft()){
			this.gameOver = true;
		}
		if(this.gameOver){
			this.storage.clearGameState();
		}
	}
}
