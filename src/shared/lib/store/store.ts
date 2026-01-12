import { configureStore } from '@reduxjs/toolkit';
import {
	chatApi,
	ingredientApi,
	marketApi,
	recipeApi,
	userApi,
} from '@/entities';
import { authApi } from '@/features';
import alertReducer from '@/features/Alert/model/alert.slice';
import { authReducer } from '@/features/Auth/model/auth.slice';

export const makeStore = () => {
	return configureStore({
		reducer: {
			auth: authReducer,
			alert: alertReducer,
			[authApi.reducerPath]: authApi.reducer,
			[userApi.reducerPath]: userApi.reducer,
			[ingredientApi.reducerPath]: ingredientApi.reducer,
			[recipeApi.reducerPath]: recipeApi.reducer,
			[marketApi.reducerPath]: marketApi.reducer,
			[chatApi.reducerPath]: chatApi.reducer,
		},
		devTools: process.env.NODE_ENV !== 'production',
		middleware: (getDefaultMiddleware) =>
			getDefaultMiddleware().concat(
				authApi.middleware,
				userApi.middleware,
				ingredientApi.middleware,
				recipeApi.middleware,
				marketApi.middleware,
				chatApi.middleware,
			),
	});
};

// Типы для использования в приложении
export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
