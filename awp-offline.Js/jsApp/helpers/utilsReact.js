import _ from 'lodash';
import { format as formatDate } from 'date-fns';
import { DATASET_TYPES } from '@awp/constants';

export const isValueEmpty = (v) => {
	if (v === null || v === undefined || v === '') return true;
	return false;
};
export const isObjectEmpty = (v) => {
	return _.isEmpty(v);
};
export const isValueNotEmpty = (v) => {
	if (v !== null && typeof v !== undefined && v !== '') return true;
	return false;
};
export const isMatchArray = (vArray, array) => {
	if (isValueEmpty(vArray) && isValueEmpty(array)) return true;
	if (vArray.length !== array.length) return false;
	if (vArray.length === 0 && array.length === 0) return true;
	for (var i = 0; i < vArray.length; ++i) {
		if (vArray[i] !== array[i]) return false;
	}
	return true;
};
export const isJsonString = (str) => {
	try {
		JSON.parse(str);
	} catch (e) {
		return false;
	}
	return true;
};
export const toNumberOrNull = (v) => {
	return isValueNotEmpty(removeStringCommas(v)) ? _.toNumber(removeStringCommas(v)) : null;
};
export const toStringOrEmpty = (v) => {
	return isValueNotEmpty(v) ? _.toString(v) : '';
};
export const toStringWithCommasOrEmpty = (v) => {
	return isValueNotEmpty(v) ? _.toString(addCommasToNumber(v)) : '';
};
export const removeStringCommas = (v) => {
	return v.toString().replace(/,/g, '');
};
export const addCommasToNumber = (n) => {
	if (isValueEmpty(n)) return n;
	let s = removeStringCommas(n).split('.');
	if (s[0].length >= 4) s[0] = s[0].replace(/(\d)(?=(\d{3})+$)/g, '$1,');
	return s.join('.');
};
export const isValidDecimal = (v, digits) => {
	if (isValueEmpty(v)) return true;
	const d = _.toInteger(digits);
	let s = Number(removeStringCommas(v)).toString().split('.');
	if (s.length < 2) return true;
	if (s[1].length <= d) return true;
	return false;
};
export const isDecimal = (v, digits) => {
	if (isValueEmpty(v)) return false;
	if (isNaN(v)) return false;
	return isValidDecimal(v, digits);
};
export const isInt = (v) => {
	if (isValueEmpty(v)) return false;
	if (!isNaN(v)) return _.isInteger(_.toNumber(v));
	return false;
};
// Returns a function, that, as long as it continues to be invoked, will not
// be triggered. The function will be called after it stops being called for
// N milliseconds. If `immediate` is passed, trigger the function on the
// leading edge, instead of the trailing.
/* istanbul ignore file */
export const debounce = (func, wait, immediate) => {
	var timeout;
	return function () {
		var context = this,
			args = arguments;
		var later = function () {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		var callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
};

export let isFunction = (obj) => {
	return obj && {}.toString.call(obj) === '[object Function]';
};
export const isOdd = (n) => {
	return Number(n) % 2 == 1;
};

//check if the json contains empty. e.g. [{}].length =1 but it is empty
export const isJsonValueEmpty = (j) => {
	return isValueEmpty(j) || JSON.stringify(j) === '[]' || JSON.stringify(j) === '[{}]' || JSON.stringify(j) === '{}';
};

//convert utc to local datetime string
export const getUtcToLocal = (tm) => {
	// tm format: e.g. 2022-02-19T13:30:00
	if (isValueEmpty(tm)) return '';
	if (!(tm + '').endsWith('Z')) tm = tm + 'Z';
	return formatDate(new Date(tm), 'yyyy-MM-dd HH:mm:ss');
};

//convert utc to local datetime string
export const getUtcToLocalByFormat = (tm, fm) => {
	// tm format: e.g. 2022-02-19T13:30:00
	if (isValueEmpty(tm)) return '';
	if (isValueEmpty(fm)) fm = 'yyyy-MM-dd HH:mm:ss';
	if (!(tm + '').endsWith('Z')) tm = tm + 'Z';
	return formatDate(new Date(tm), fm);
};

//convert utc to local datetime string
export const getLocalByFormat = (tm, fm) => {
	// tm format: e.g. 2022-02-19T13:30:00
	if (isValueEmpty(tm)) return '';
	if (isValueEmpty(fm)) fm = 'yyyy-MM-dd HH:mm:ss';
	return formatDate(new Date(tm), fm);
};

export const truncateString = (str, n) => {
	return str.length > n ? str.substr(0, n - 1) + '...' : str;
};

export const parseDatasetId = (datasetId) => {
	const attributes = datasetId.split('_');

	const prefix = parseInt(attributes[0]);
	let datasetType = '';

	if (prefix === 0) datasetType = DATASET_TYPES.Regular;
	else if (prefix === 1) datasetType = DATASET_TYPES.Image;
	else if (prefix === 2) datasetType = DATASET_TYPES.ForecastData;
	else if (prefix >= 100000 && prefix < 200000) datasetType = DATASET_TYPES.FrostProbe;
	else if (prefix >= 200000 && prefix < 300000) datasetType = DATASET_TYPES.SnowPole;

	const observationTypeId = parseInt(attributes[1]);

	return { prefix, datasetType, observationTypeId };
};
