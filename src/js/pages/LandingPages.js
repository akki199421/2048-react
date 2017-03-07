import React from "react";
import {Link} from 'react-router';
import Slider from 'react-slick';

export default class LandingPage extends React.Component{
	render(){
		var settings = {
	      dots: true,
	      infinite: true,
	      speed: 500,
	      slidesToShow: 1,
	      slidesToScroll: 1
	    };
		return(
			<div class="header">
				<div class="heading">
					<h1>2048</h1>
					<h4>The Game 2048 using AngularJs</h4>
				</div>
				<Slider {...settings}>
			       	<div class="layer">	<Link to="/layout/4">Classic (4x4)</Link></div>
			        <div class="layer">	<Link to="/layout/5">Big (5x5)</Link></div>
			        <div class="layer">	<Link to="/layout/6">Bigger (6x6)</Link></div>
			    </Slider>
			    <div class="submit-lay-btn">
				</div>
			</div>
		);
	}
}
