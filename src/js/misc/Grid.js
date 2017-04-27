import React from 'react';

import GameCntrl from './GameCntrl';
import GridCell from '../components/GridCell'; 
import GridTile  from '../components/GridTile';
import Keyboard_Service from '../components/Keyboard_service';
import GameHeading from '../components/GameHeading';
import GameEnd from '../components/GameEnd';

export default class Grid extends React.Component {
	constructor(params){
		super();
		this.gridSize = params.gridSize;
		this.GameCntrl = new GameCntrl(this.gridSize);
		const {gridClass,score,gameWon,gameOver} = this.GameCntrl;
		this.state = {
			gridCls: gridClass,
			score,
			gameWon,
			gameOver
		};
		
		this.Key_Ser = new Keyboard_Service();
		this.Key_Ser.startListen((key) => this.move(key));
	}
	setStateArg(callback){
		const {gridClass,score,gameWon,gameOver} = this.GameCntrl;
		this.setState({
			gridCls: gridClass,
			score,
			gameWon,
			gameOver
		},callback);
	}
	move(key){ 
		this.GameCntrl.move(key);
		this.setStateArg();
		//stop key service
		if(this.state.gameWon || this.state.gameOver){
			this.Key_Ser.stopListen();
		}
	}
	continuefn(){
		this.GameCntrl.gridClass.setWinnigs(999999);
		this.setStateArg({gameWon : false},() => {this.Key_Ser.startListen((key) => this.move(key));});
		this.GameCntrl.updateGameWon();
	}
	reInit(){
		this.GameCntrl.clearGameState();
		this.GameCntrl = new GameCntrl(this.gridSize);
		this.setStateArg(() => {this.Key_Ser.startListen((key) => this.move(key));});
	}
	undoMove(){
		this.GameCntrl.undoMove();
		this.setStateArg();
	}
	render(){
		const { grid,gridsize } = this.state.gridCls;
		const { score,gameOver,gameWon } = this.state;
		const cells = grid.map((tile,i) =>   <GridCell key={i} gridSize={gridsize}/>);
		return(
			<div>
				<GameHeading score={score} reInit={this.reInit.bind(this)} undoMove={this.undoMove.bind(this)}/>
				<div class="game">
					<div class="game-pos">
						<div class="game-grid row">
						{cells}
						<GridTile tile={grid} gridSize={gridsize} />
						</div>
						{gameWon || gameOver ? <GameEnd gameWon={gameWon} gameOver={gameOver} continuefn={this.continuefn.bind(this)}
						reInit={this.reInit.bind(this)}/>: null}
					</div>
				</div>
			</div>
		);
	}
}
