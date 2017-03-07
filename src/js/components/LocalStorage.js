
window.fakeStorage = {
	_date : {},

	setItem:  (id, val) => {
    return this._data[id] = String(val);
	},

	getItem: (id) => {
	return this._data.hasOwnProperty(id) ? this._data[id] : undefined;
	},

	removeItem: (id) => {
	return delete this._data[id];
	},

	clear: () => {
	return this._data = {};
	}

}
export default class LocalStorage{
	constructor(){
		this.bestScoreKey = "bestScore",
		this.gameStateKey = "gameState",
		this.previousGameStateKey = "previousGameState";
		this.supported = this.isLocalStorageSupported();
		this.storage = this.supported ? window.localStorage : window.fakeStorage;
	}
	isLocalStorageSupported(){
		var storage = window.localStorage;

		try{
			storage.setItem('Test',1);
			storage.removeItem('Test');
			return true;
		}
		catch(error){
			return false;
		}
	}
	setBestScore(score){
		this.storage.setItem(this.bestScoreKey,score);
	}
	getBestScore(){
		return this.storage.getItem(this.bestScoreKey) || 0;
	}
	setGameState(state){
		var oldstate = this.getGameState();
		if(oldstate){
			this.storage.setItem(this.previousGameStateKey,JSON.stringify(oldstate));
		}
		this.storage.setItem(this.gameStateKey,JSON.stringify(state));
	}
	getGameState(){
		var gameState =  this.storage.getItem(this.gameStateKey);
		return gameState ? JSON.parse(gameState) : null;
	}
	getPreviousGameState(){
		var gameState =  this.storage.getItem(this.previousGameStateKey);
		return gameState ? JSON.parse(gameState) : null;
	}
	clearGameState(){
		this.storage.removeItem(this.previousGameStateKey);
		this.storage.removeItem(this.gameStateKey);
	}
}
