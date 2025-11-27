import { configureStore } from '@reduxjs/toolkit';
import { chatApi, ingredientApi, recipeApi, userApi } from '@/entities';
import { authApi } from '@/features';
import alertReducer from '@/features/Alert/model/alert.slice';
import { authReducer } from '@/features/Auth/model/auth.slice';
import counterReducer from '@/features/Counter/model/counter.slice';

export const store = configureStore({
	reducer: {
		counter: counterReducer,
		auth: authReducer,
		alert: alertReducer,
		[authApi.reducerPath]: authApi.reducer,
		[userApi.reducerPath]: userApi.reducer,
		[ingredientApi.reducerPath]: ingredientApi.reducer,
		[recipeApi.reducerPath]: recipeApi.reducer,
		[chatApi.reducerPath]: chatApi.reducer,
	},
	devTools: process.env.NODE_ENV !== 'production',
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(
			authApi.middleware,
			userApi.middleware,
			ingredientApi.middleware,
			recipeApi.middleware,
			chatApi.middleware,
		),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
