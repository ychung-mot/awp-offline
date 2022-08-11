const getPosition = () => {
	return new Promise((res, rej) => {
		navigator.geolocation.getCurrentPosition(res, rej, {
			enableHighAccuracy: true,
			timeout: 5000,
			maximumAge: 0,
		});
	});
};

class SimpleExample extends React.Component {
	constructor(props) {
		super(props);
		this.state = { locationData: { coords: { latitude: null, longitude: null, accuracy: 0, speed: 0 } } };
		this.getPosition = this.getPosition.bind(this);
	}

	getPosition() {
		getPosition().then((res) => {
			console.log(res);
			this.setState({ locationData: res });
		});
	}

	render() {
		return (
			<div>
				<h1>Get GeoLocation</h1>

				<p>This is a simple example of a React component that pulls current GeoLocation</p>

				<p aria-live="polite">
					Longtitude: <strong>{this.state.locationData.coords.longitude}</strong>
				</p>
				<p aria-live="polite">
					Latitude: <strong>{this.state.locationData.coords.latitude}</strong>
				</p>
				<p aria-live="polite">
					Accuracy: <strong>{this.state.locationData.coords.accuracy}m</strong>
				</p>
				<p aria-live="polite">
					Speed:{' '}
					<strong>{this.state.locationData.coords.speed == null ? 0 : this.state.locationData.coords.speed}m/s</strong>
				</p>
				<button className="btn btn-primary" onClick={this.getPosition}>
					Get Position
				</button>
			</div>
		);
	}
}

ReactDOM.render(<SimpleExample />, document.getElementById('example'));
