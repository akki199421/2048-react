import React from "react";
import ReactDom from "react-dom";
import { Router, Route, IndexRoute, hashHistory} from "react-router";

import LandingPage from "./pages/LandingPage";
import Layout from "./pages/Game-Layout";

const app = document.getElementById('app');

ReactDom.render(
	<Router history={hashHistory}>
		<Route path="/" component={LandingPage}>
		</Route>
		<Route path="/layout/:size" component={Layout}>
		</Route>
	</Router>
	,app);
