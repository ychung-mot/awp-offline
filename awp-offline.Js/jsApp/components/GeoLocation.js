import React from 'react';
import SpatialReference from "@arcgis/core/geometry/SpatialReference";
import Point from "@arcgis/core/geometry/Point";
import { load as projectionLoad, project } from "@arcgis/core/geometry/projection";

const getPosition = () => {
	return new Promise((res, rej) => {
		navigator.geolocation.getCurrentPosition(res, rej, {
			enableHighAccuracy: true,
			timeout: 5000,
			maximumAge: 0,
		});
	});
};

class GeoLocation extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			locationData: {
				coords: {
					latitude: null,
					longitude: null,
					accuracy: 0,
					speed: 0
				}
      },
      bcAlbers: {
        lat: null,
        long: null,
      },
		};
		this.getPosition = this.getPosition.bind(this);
	}

	getPosition() {
		getPosition().then((res) => {
			console.log(res);

      const point = new Point({
        longitude: res.coords.longitude,
        latitude: res.coords.latitude,
      });

      projectionLoad().then(() => {
        const center = project(point, new SpatialReference({wkid: 3005}));
        this.setState({ locationData: res, bcAlbers: {lat: center.x, long: center.y, } });

      });

		});
	}

	render() {
		return (
			<div>
				<h1>Get GeoLocation</h1>

				<p>This is a simple example of a React component that pulls current GeoLocation</p>
        <strong>World Geodetic System 1984 (WGS84) [WKID: 4326]</strong>
				<p aria-live="polite">
					Longtitude: <strong>{this.state.locationData.coords.longitude}</strong>
				</p>
				<p aria-live="polite">
					Latitude: <strong>{this.state.locationData.coords.latitude}</strong>
				</p>
				<hr/>
        <strong>North American Datum 1983 (NAD83) / BC Albers [WKID: 3005]</strong>
        <p aria-live="polite">
					Longtitude: <strong>{this.state.bcAlbers.long}</strong>
				</p>
				<p aria-live="polite">
					Latitude: <strong>{this.state.bcAlbers.lat}</strong>
				</p>
        <hr/>
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

export default GeoLocation;
