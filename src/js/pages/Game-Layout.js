import React from "react";
import {Link} from 'react-router';

import Grid from '../misc/Grid';

export default class Layout extends React.Component {
	render(){
		const { size } = this.props.params;
		return(
				<div> 
					<Grid gridSize={size}/>
				</div>
			);
	}
}
