import React from "react";


export default class Keyboard_service{
	constructor(){
		this.keys = {
			ArrowUp: "up",
			ArrowDown : "down",
			ArrowLeft: "left",
			ArrowRight: "right"
		};
		this.isValid = true; 
		//call init
		this.init();
	}
	init(){
		document.addEventListener('keydown',(e) => {
			var curr_key  = this.keys[e.key];
			if(curr_key && this.isValid){
				e.preventDefault();
				this.cb(curr_key);
			}
		});
	}
	startListen(callback){
		this.isValid = true;
		this.cb = callback;
	}
	stopListen(){
		this.isValid = false;
	}

}
