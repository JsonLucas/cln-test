import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
	name: "userInfo",
	initialState: { username: '' },
	reducers: {
		setUsername(state, action) {
			state.username = action.payload.username;
		},
	},
});

export const userActions = userSlice.actions;
export default userSlice;