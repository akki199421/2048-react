import React from 'react';

export default class GameEnd extends React.Component {
	render(){
		const {gameOver,gameWon} = this.props;
		var message = gameWon ? 'You Won' : 'Game Over';
		var classes = gameWon ?  'game-won' :  (gameOver? 'game-over' : '');
		classes += ' game-grid-over';
		var continue_btn = gameWon ? <a class="new-btn btm-btn btn" onClick={this.props.continuefn}>Continue</a> : null;
		return(
			<div>
				<div class={classes}>
						{message}
						{continue_btn}
						<a class="new-btn btn" onClick={this.props.reInit}>Try Again</a>
				</div>
			</div>
			);
	}
}
