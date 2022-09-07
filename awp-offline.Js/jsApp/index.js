/* istanbul ignore file */
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import App from '@awp/App';
import AwpCommon from '@components/awpCommon';
import store from '@stores/store';

import fetchInterceptor from '@awp/helpers/fetchInterceptor';
window.fetch = async (...args) => fetchInterceptor(store, args);

window.addEventListener('load', () => {
	ReactDOM.render(
		<Provider store={store}>
			<AwpCommon>
				<App />
			</AwpCommon>
		</Provider>,
		document.getElementById('root')
	);

	return true;
});
