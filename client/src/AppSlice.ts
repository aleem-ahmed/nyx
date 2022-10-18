import { createSlice } from '@reduxjs/toolkit';


export const appSlice = createSlice({
	name: 'App',
	
	initialState: {
		walletAddress: '',
		walletBalance: 0,
	},

	reducers: {}
});

export default appSlice.reducer;