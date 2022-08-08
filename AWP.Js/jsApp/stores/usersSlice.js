import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { GetJson } from '../helpers/fetchReact';
import { REST_API } from '../constants';
import { STATE_STATUS } from '../constants';

const initialState = {
	currentUser: {},
	status: STATE_STATUS.IDLE,
	error: null,
};

export const selectCurrentUser = (state) => state.users.currentUser;

export const fetchCurrentUser = createAsyncThunk('users/fetchCurrentUser', async () => {
	const url = REST_API.USERS + 'currentuser';
	return GetJson(url).then((response) => response.json());
});

export const usersSlice = createSlice({
	name: 'users',
	initialState,
	reducers: {},
	extraReducers: {
		[fetchCurrentUser.pending]: (state) => {
			state.status = STATE_STATUS.LOADING;
		},
		[fetchCurrentUser.fulfilled]: (state, action) => {
			state.status = STATE_STATUS.SUCCESS;
			state.currentUser = action.payload;
		},
		[fetchCurrentUser.rejected]: (state, action) => {
			state.status = STATE_STATUS.FAILED;
			state.error = action.error.message;
		},
	},
});
