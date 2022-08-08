import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	show: false,
	title: undefined,
	message: undefined,
	statusCode: undefined,
};

export const selectError = (state) => state.errorDialog;

export const errorDialogSlice = createSlice({
	name: 'errorDialog',
	initialState,
	reducers: {
		showErrorDialog(state, action) {
			return { show: true, ...action.payload };
		},
		hideErrorDialog(state) {
			return initialState;
		},
	},
});

export const { showErrorDialog, hideErrorDialog } = errorDialogSlice.actions;
