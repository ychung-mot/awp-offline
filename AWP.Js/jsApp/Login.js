/* istanbul ignore file */
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import './custom.css';

import App from '@awp/App';
import AwpCommon from '@components/awpCommon';
import store from '@stores/store';

import fetchInterceptor from '@awp/helpers/fetchInterceptor';
window.fetch = async (...args) => fetchInterceptor(store, args);

const idirLink = '/Account/SignIn?idpHint=idir&redirectUrl=https://' + window.location.host;
const bceidLink = '/Account/SignIn?idpHint=bceidbusiness&redirectUrl=https://' + window.location.host;

window.addEventListener('load', () => {
	if (navigator.onLine) {
		ReactDOM.render(
			<>
				<div className="container my-5">
					<div className="col d-flex justify-content-center">
						<div className="card text-center" style={{ width: '30rem' }}>
							<div id="header_title" className="card-header">
								<h3 style={{ height: '3rem', verticalAlign: 'middle', display: 'table-cell' }}>Authenticate with:</h3>
							</div>
							<div className="card-body">
								<div className="btn-group-vertical">
									<a className="btn btn-primary my-2" href={idirLink}>
										IDIR
									</a>
									<a className="btn btn-primary my-2" href={bceidLink}>
										Business BCeID
									</a>
								</div>
							</div>
						</div>
					</div>
				</div>
			</>,
			document.getElementById('login')
		);
	} else {
		ReactDOM.render(
			<Provider store={store}>
				<AwpCommon>
					<App />
				</AwpCommon>
			</Provider>,
			document.getElementById('login')
		);
	}
});
