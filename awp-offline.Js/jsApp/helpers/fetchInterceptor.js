import { showErrorDialog } from '@stores/errorDialogSlice';

const { fetch: originalFetch } = window;

const errorDialog = {
	show: true,
	title: 'Server Error',
	message: 'Unknown error occurred.',
	statusCode: undefined,
};

const fetchInterceptor = async (store, args) => {
	const [resource, config] = args;
	const response = await originalFetch(resource, config).catch((error) => {
		store.dispatch(showErrorDialog(errorDialog));
		throw error;
	});

	if (response.ok || response.status === 412) return response;

	if (response.status === 401 || response.status === 403) {
		window.location.reload();
		return;
	}

	if (response.status === 400) {
		errorDialog.title = 'Bad Request';
		errorDialog.message = 'Validation failed';
	}

	errorDialog.statusCode = response.status;
	store.dispatch(showErrorDialog(errorDialog));

	return Promise.reject(response);
};

export default fetchInterceptor;
