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
				<div>
					<a href={idirLink}>IDIR</a>
					<a href={bceidLink}>Business BCeID</a>
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
