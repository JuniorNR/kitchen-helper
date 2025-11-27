import {
	type BaseQueryFn,
	type FetchArgs,
	type FetchBaseQueryError,
	fetchBaseQuery,
} from '@reduxjs/toolkit/query';
import { apiConfig } from '@/configs';
import {
	setAuthToken,
	setIsAuthenticated,
} from '@/features/Auth/model/auth.slice';

const rawBaseQuery = fetchBaseQuery({
	baseUrl: `${apiConfig.isProd ? apiConfig.APP_BACKEND_URL_PROD : apiConfig.APP_BACKEND_URL}/api`,
	prepareHeaders: (headers) => {
		const token =
			typeof window !== 'undefined'
				? (() => {
						try {
							return localStorage.getItem('auth_token');
						} catch {
							return null;
						}
					})()
				: null;
		if (token) {
			headers.set('Authorization', `Bearer ${token}`);
		}
		headers.set('Accept', 'application/json');
		return headers;
	},
});

export const baseQuery: BaseQueryFn<
	string | FetchArgs,
	unknown,
	FetchBaseQueryError
> = async (args, api, extraOptions) => {
	const result = await rawBaseQuery(args, api, extraOptions);

	const error = (result as { error?: FetchBaseQueryError }).error;
	if (error?.status === 401) {
		api.dispatch(setIsAuthenticated(false));
		api.dispatch(setAuthToken(null));
		if (typeof window !== 'undefined') {
			try {
				localStorage.removeItem('auth_token');
			} catch {}
		}
	}

	return result;
};
