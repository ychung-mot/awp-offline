import React from 'react';
import NetworkStatus from './NetworkStatus';

const Home = () => {
	return (
		<div>
			<NetworkStatus />
			<h1>The Avalanche and Weather Programs.</h1>
			<div className="row">
				<div className="col-md-4">
					<div className="card mb-3">
						<h4 className="card-header">System Notifications</h4>
						<div className="card-body">
							<p>Recent changes...</p>
						</div>
					</div>
				</div>
				<div className="col-md-4">
					<div className="card mb-3">
						<h4 className="card-header">Alerts</h4>
						<div className="card-body">
							<p>Alerts here...</p>
						</div>
					</div>
				</div>
				<div className="col-md-4">
					<div className="card mb-3">
						<h4 className="card-header">My Data</h4>
						<div className="card-body">
							<p>Data I'm interested in...</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
export default Home;
