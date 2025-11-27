import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

type AuthState = {
	isAuthenticated: boolean;
	authToken: string | null;
};

const initialState: AuthState = {
	isAuthenticated: false,
	authToken: null,
};

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setIsAuthenticated: (state, action: PayloadAction<boolean>) => {
			state.isAuthenticated = action.payload;
		},
		setAuthToken: (state, action: PayloadAction<string | null>) => {
			state.authToken = action.payload;
		},
	},
});

export const { setIsAuthenticated, setAuthToken } = authSlice.actions;
export const authReducer = authSlice.reducer;
