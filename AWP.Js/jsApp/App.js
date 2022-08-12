import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import Home from '@components/Home';
import FetchData from '@components/FetchData';
import GeoLocation from '@components/GeoLocation';

import './custom.css';

const App = () => {
	return (
		<>
			<Router>
				<div>
					<ul>
						<li>
							<Link to="/">Home</Link>
						</li>
						<li>
							<Link to="/geolocation">Geo Location</Link>
						</li>
						<li>
							<Link to="/fetch-data">Identity Providers</Link>
						</li>
					</ul>

					<hr />
					<Switch>
						<Route exact path="/">
							<Home />
						</Route>
						<Route path="/geolocation">
							<GeoLocation />
						</Route>
						<Route path="/fetch-data">
							<FetchData />
						</Route>
					</Switch>
				</div>
			</Router>
		</>
	);
};

export default App;
