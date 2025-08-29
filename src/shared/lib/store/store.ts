import { configureStore } from '@reduxjs/toolkit';
import { userApi } from '@/entities';
import { authApi } from '@/features';
import { authReducer } from '@/features/Auth/model/auth.slice';
import counterReducer from '@/features/Counter/model/counter.slice';

export const store = configureStore({
	reducer: {
		counter: counterReducer,
		auth: authReducer,
		[authApi.reducerPath]: authApi.reducer,
		[userApi.reducerPath]: userApi.reducer,
	},
	devTools: process.env.NODE_ENV !== 'production',
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(authApi.middleware, userApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
