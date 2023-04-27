import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth-slice";
import userSlice from "./user-slilce";

const store = configureStore({
	reducer: {
		auth: authSlice.reducer,
		username: userSlice.reducer
	},
});
export default store;