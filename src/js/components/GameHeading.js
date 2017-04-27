import React from 'react';

export default class GameHeading extends React.Component{
	render(){
		const { score } =  this.props;
		return(
			<div class="header">
				<div class="heading">
					<h1>2048</h1>
					<h4>The Game 2048 using ReactJS</h4>
					<div>
						<div class="score">Score : {score}</div>
						<div class="btn reset-game-btn" onClick={this.props.undoMove}>Undo Move</div>
						<div class="btn reset-game-btn" onClick={this.props.reInit}>New Game</div>
					</div>
				</div>
			</div>
			);
	}
}
