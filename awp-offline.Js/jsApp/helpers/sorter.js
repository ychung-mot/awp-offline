import _ from 'lodash-contrib';
import { isValueEmpty } from './utilsReact';

let sortingOrder = (a, b, order) => {
	if (a == b) return 0;

	let isSortingAsc = order.toLowerCase() === 'asc';
	if (isSortingAsc ? a > b : a < b) {
		return 1;
	} else {
		return -1;
	}
};

export function dataTablesSortCI(data, sort, column) {
	let field = column['field'] || this.field;

	return data.sort((a, b) => {
		/* eslint-disable no-prototype-builtins */
		if (!a.hasOwnProperty(field) || !b.hasOwnProperty(field)) return 0;

		let aVal = a[field] === null ? '' : a[field].toLowerCase();
		let bVal = b[field] === null ? '' : b[field].toLowerCase();
		return sortingOrder(aVal, bVal, sort);
	});
}

// Purpose : Sort callback for objects.	E.g WeatherStation as data with Name as column
export function dataTablesSortCIObject(data, sort, column) {
	let field = column['field'] || this.field;

	return data.sort((a, b) => {
		/* eslint-disable no-prototype-builtins */
		if (!a.hasOwnProperty(field) || !b.hasOwnProperty(field)) return 0;

		let aVal = a[field] === null || a[field][this.column] === null ? '' : a[field][this.column].toLowerCase();

		let bVal = b[field] === null || b[field][this.column] === null ? '' : b[field][this.column].toLowerCase();

		return sortingOrder(aVal, bVal, sort);
	});
}

export function dataTablesNumberSortCI(data, sort, column) {
	let field = column['field'] || this.field;

	return data.sort((a, b) => {
		if (!Object.prototype.hasOwnProperty.call(a, field) || !Object.prototype.hasOwnProperty.call(b, field)) return 0;

		let aVal = a[field];
		let bVal = b[field];

		return sortingOrder(aVal, bVal, sort);
	});
}
export function sortByNumericThenAlpha(rowA, rowB, id) {
	if (!rowA || !rowB) {
		// return default react-table sorting
		return 'basic';
	}
	if (!rowA.values[id] && !rowB.values[id]) {
		// return default react-table sorting
		return 'basic';
	}
	if (!rowB.values[id]) {
		return 1;
	}
	if (!rowA.values[id] && rowB.values[id]) {
		return -1; //b bigger
	}
	if (isValueEmpty(rowB.values[id])) {
		return 1;
	}
	if (isValueEmpty(rowA.values[id]) && !isValueEmpty(rowB.values[id])) {
		return -1;
	}
	if (_.isNumeric(rowA.values[id]) && _.isNumeric(rowB.values[id])) {
		return _.toNumber(rowA.values[id]) >= _.toNumber(rowB.values[id]) ? 1 : -1;
	}

	return (rowA.values[id] + '').toLowerCase().localeCompare((rowB.values[id] + '').toLowerCase());
}

export function sortDataTablesByNumericThenAlpha(rowA, rowB, id) {
	if (!rowA || !rowB) {
		// return default react-table sorting
		return 'basic';
	}
	if (!rowA.values[id] && !rowB.values[id]) {
		// return default react-table sorting
		return 'basic';
	}
	if (!rowB.values[id]) {
		return 1;
	}
	if (!rowA.values[id] && rowB.values[id]) {
		return -1; //b bigger
	}
	if (isValueEmpty(rowB.values[id].Value)) {
		return 1;
	}
	if (isValueEmpty(rowA.values[id].Value) && !isValueEmpty(rowB.values[id].Value)) {
		return -1;
	}
	if (_.isNumeric(rowA.values[id].Value) && _.isNumeric(rowB.values[id].Value)) {
		return _.toNumber(rowA.values[id].Value) >= _.toNumber(rowB.values[id].Value) ? 1 : -1;
	}

	return (rowA.values[id].Value + '').toLowerCase().localeCompare((rowB.values[id].Value + '').toLowerCase());
}
