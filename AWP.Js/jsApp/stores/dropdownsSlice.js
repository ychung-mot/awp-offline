import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { GetJson } from '../helpers/fetchReact';
import { REST_API } from '../constants';
import { STATE_STATUS } from '../constants';

const initialState = {
	roles: [],
	userTypes: [],
	accessRequestStatuses: [],
	permissions: [],
	status: {
		roles: STATE_STATUS.IDLE,
		userTypes: STATE_STATUS.IDLE,
		accessRequestStatuses: STATE_STATUS.IDLE,
		permissions: STATE_STATUS.IDLE,
	},
};

export const selectRoles = (state) => {
	return { options: state.dropdowns.roles, status: state.dropdowns.status.roles };
};
export const fetchRoles = createAsyncThunk('dropdowns/roles', async () => {
	const url = REST_API.DROPDOWNS + 'roles';
	return GetJson(url).then((response) => response.json());
});

export const selectUserTypes = (state) => {
	return { options: state.dropdowns.userTypes, status: state.dropdowns.status.userTypes };
};
export const fetchUserTypes = createAsyncThunk('dropdowns/userTypes', async () => {
	const url = REST_API.DROPDOWNS + 'usertypes';
	return GetJson(url).then((response) => response.json());
});

export const selectAccessRequestStatuses = (state) => {
	return { options: state.dropdowns.accessRequestStatuses, status: state.dropdowns.status.accessRequestStatuses };
};
export const fetchAccessRequestStatuses = createAsyncThunk('dropdowns/accessRequestStatuses', async () => {
	const url = REST_API.DROPDOWNS + 'accessRequestStatuses';
	return GetJson(url).then((response) => response.json());
});

export const selectPermissions = (state) => {
	return { options: state.dropdowns.permissions, status: state.dropdowns.status.permissions };
};
export const fetchPermissions = createAsyncThunk('dropdowns/permissions', async () => {
	const url = REST_API.DROPDOWNS + 'permissions';
	return GetJson(url).then((response) => response.json());
});

export const dropdownsSlice = createSlice({
	name: 'dropdowns',
	initialState,
	reducers: {},
	extraReducers: {
		[fetchRoles.pending]: (state) => {
			state.status.roles = STATE_STATUS.LOADING;
		},
		[fetchRoles.fulfilled]: (state, action) => {
			state.roles = action.payload;
			state.status.roles = STATE_STATUS.SUCCESS;
		},
		[fetchRoles.rejected]: (state, action) => {
			state.status.roles = STATE_STATUS.FAILED;
		},
		[fetchUserTypes.pending]: (state) => {
			state.status.userTypes = STATE_STATUS.LOADING;
		},
		[fetchUserTypes.fulfilled]: (state, action) => {
			state.userTypes = action.payload;
			state.status.userTypes = STATE_STATUS.SUCCESS;
		},
		[fetchUserTypes.rejected]: (state, action) => {
			state.status.userTypes = STATE_STATUS.FAILED;
		},
		[fetchAccessRequestStatuses.pending]: (state) => {
			state.status.accessRequestStatuses = STATE_STATUS.LOADING;
		},
		[fetchAccessRequestStatuses.fulfilled]: (state, action) => {
			state.accessRequestStatuses = action.payload;
			state.status.accessRequestStatuses = STATE_STATUS.SUCCESS;
		},
		[fetchAccessRequestStatuses.rejected]: (state, action) => {
			state.status.accessRequestStatuses = STATE_STATUS.FAILED;
		},
		[fetchPermissions.pending]: (state) => {
			state.status.permissions = STATE_STATUS.LOADING;
		},
		[fetchPermissions.fulfilled]: (state, action) => {
			state.permissions = action.payload;
			state.status.permissions = STATE_STATUS.SUCCESS;
		},
		[fetchPermissions.rejected]: (state, action) => {
			state.status.permissions = STATE_STATUS.FAILED;
		},
	},
});
