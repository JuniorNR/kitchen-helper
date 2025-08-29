'use client';
import Cookies from 'js-cookie';
import { useDispatch } from 'react-redux';
import { userApi } from '@/entities/user/model/user.api';
import {
	useLoginMutation,
	useLogoutMutation,
	useSignUpMutation,
} from './auth.api';
import { setIsAuthenticated } from './auth.slice';
import type { LoginFormData, SignUpFormData } from './auth.types';

export const useAuth = () => {
	const dispatch = useDispatch();
	const [signUp, { isLoading: isSignUpLoading }] = useSignUpMutation();
	const [login, { isLoading: isLoginLoading }] = useLoginMutation();
	const [logout, { isLoading: isLogoutLoading }] = useLogoutMutation();

	const signUpData = async (dataToSend: SignUpFormData) => {
		try {
			const { data, code } = await signUp(dataToSend).unwrap();
			if (data.token) {
				localStorage.setItem('auth_token', data.token);
				Cookies.set('auth_token', data.token, {
					expires: 2,
					path: '/',
					sameSite: 'Lax',
				});
			}
			dispatch(setIsAuthenticated(true));
			return data.user;
		} catch (_) {
			return null;
		}
	};

	const loginData = async (dataToSend: LoginFormData) => {
		try {
			const { data, code } = await login(dataToSend).unwrap();
			if (data.token) {
				localStorage.setItem('auth_token', data.token);
				Cookies.set('auth_token', data.token, {
					expires: 2,
					path: '/',
					sameSite: 'Lax',
				});
			}
			dispatch(setIsAuthenticated(true));
			return data.user;
		} catch (_) {
			return null;
		}
	};

	const logoutData = async () => {
		try {
			const result = await logout().unwrap();
			localStorage.removeItem('auth_token');
			Cookies.remove('auth_token', { path: '/' });
			dispatch(setIsAuthenticated(false));
			dispatch(userApi.util.invalidateTags(['User']));
			return result;
		} catch (_) {
			return null;
		}
	};

	return {
		signUpData,
		loginData,
		logoutData,
		isSignUpLoading,
		isLoginLoading,
		isLogoutLoading,
	};
};
