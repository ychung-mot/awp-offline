import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import Home from '@components/Home';
import FetchData from '@components/FetchData';
import GeoLocation from '@components/GeoLocation';
import DexieDemo from './components/DexieDemo/DexieDemo';

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
						<li>
							<Link to="/dexie">Dexie</Link>
						</li>
					</ul>

					<hr />
					<Switch>
						<Route exact path="/">
							<Home />
						</Route>
						<Route path="/Geolocation">
							<GeoLocation />
						</Route>
						<Route path="/fetch-data">
							<FetchData />
						</Route>
						<Route path="/dexie">
							<DexieDemo />
						</Route>
					</Switch>
				</div>
			</Router>
		</>
	);
};

export default App;
