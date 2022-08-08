/* istanbul ignore file */
import { configureStore } from '@reduxjs/toolkit';
import { usersSlice } from './usersSlice.js';
import { errorDialogSlice } from './errorDialogSlice.js';
import { dropdownsSlice } from './dropdownsSlice.js';

const store = configureStore({
	reducer: {
		users: usersSlice.reducer,
		dropdowns: dropdownsSlice.reducer,
		errorDialog: errorDialogSlice.reducer,
	},
});

export default store;
