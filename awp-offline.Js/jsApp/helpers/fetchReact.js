import { API_DEFAULT_PREFIX, API_DEFAULT_VERSION } from '../constants';

export const GetFullUrl = (path, prefixPath, prefixVersion) => {
	if (!path || typeof path !== 'string') {
		console.error('No URL supplied for API call.');
		return;
	}
	return prefixPath + prefixVersion + (path.startsWith('/') ? path : '/' + path);
};

/*export const GetFullUrl = (path) => {
	if ( !path || typeof path !== "string" ) {
		console.error("No URL supplied for API call.");
		return;
	}

	return path;

	//return (path.startsWith(API_PREFIX) || path.startsWith(API_PREFIX_V2)) ? path : API_PREFIX + "/" + path;
}*/

export const ParseErrorMessage = (responseData) => {
	let inputErrMsg = '';
	if (!responseData.ModelState) {
		inputErrMsg = responseData.Message;
	}
	for (let errorInput in responseData.ModelState) {
		inputErrMsg = responseData.ModelState[errorInput][0];
	}
	if (responseData.length === 0) {
		inputErrMsg = responseData.Message;
	}
	return inputErrMsg;
};

export const FetchJson = (url, prefixPath, prefixVersion, data, type) => {
	let fullUrl = GetFullUrl(url, prefixPath, prefixVersion);
	//let fullUrl = GetFullUrl(url);
	return fetch(fullUrl, {
		method: type.toUpperCase(),
		headers: {
			'Content-Type': 'application/json',
			Accept: 'application/json',
		},
		body: JSON.stringify(data),
	});
};

export const GetJson = (url, data, prefixPath = API_DEFAULT_PREFIX, prefixVersion = API_DEFAULT_VERSION) => {
	return FetchJson(url, prefixPath, prefixVersion, data, 'GET');
};

export const PostJson = (url, data, prefixPath = API_DEFAULT_PREFIX, prefixVersion = API_DEFAULT_VERSION) => {
	return FetchJson(url, prefixPath, prefixVersion, data, 'POST');
};

export const PutJson = (url, data, prefixPath = API_DEFAULT_PREFIX, prefixVersion = API_DEFAULT_VERSION) => {
	return FetchJson(url, prefixPath, prefixVersion, data, 'PUT');
};

export const DeleteJson = (url, data, prefixPath = API_DEFAULT_PREFIX, prefixVersion = API_DEFAULT_VERSION) => {
	return FetchJson(url, prefixPath, prefixVersion, data, 'DELETE');
};
