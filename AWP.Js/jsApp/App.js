import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import Home from '@components/Home';
import FetchData from '@components/FetchData';
import { Counter } from '@components/Counter';

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
							<Link to="/counter">Counter</Link>
						</li>
						<li>
							<Link to="/fetch-data">Fetch Data</Link>
						</li>
					</ul>

					<hr />
					<Switch>
						<Route exact path="/">
							<Home />
						</Route>
						<Route path="/counter">
							<Counter />
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
