import {
	type BaseQueryFn,
	type FetchArgs,
	type FetchBaseQueryError,
	fetchBaseQuery,
} from '@reduxjs/toolkit/query';
import Cookies from 'js-cookie';
import { setIsAuthenticated } from '@/features/Auth/model/auth.slice';

const isBrowser = typeof window !== 'undefined';

const rawBaseQuery = fetchBaseQuery({
	// baseUrl: process.env.NEXT_PUBLIC_PROD
	// 	? process.env.NEXT_PUBLIC_API_URL_PROD
	// 	: process.env.NEXT_PUBLIC_API_URL_DEV,
	baseUrl: 'https://kitchen-helper-server-production.up.railway.app/api',
	prepareHeaders: (headers) => {
		const token = isBrowser ? localStorage.getItem('auth_token') : null;
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
		if (isBrowser) {
			localStorage.removeItem('auth_token');
			Cookies.remove('auth_token', { path: '/' });
		}
	}

	return result;
};
