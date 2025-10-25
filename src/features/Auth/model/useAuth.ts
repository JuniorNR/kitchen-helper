'use client';
import { useDispatch } from 'react-redux';
import { userApi } from '@/entities/user/model/user.api';
import { addAlert } from '@/features/Alert';
import {
	useLoginMutation,
	useLogoutMutation,
	useSignUpMutation,
} from './auth.api';
import { setIsAuthenticated } from './auth.slice';
import type {
	AuthResponseError,
	LoginFormData,
	SignUpFormData,
} from './auth.types';

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
			}
			dispatch(setIsAuthenticated(true));
			dispatch(
				addAlert({
					id: crypto.randomUUID(),
					status: 'success',
					title: 'Success',
					description: code,
				}),
			);
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
			}
			dispatch(setIsAuthenticated(true));
			dispatch(
				addAlert({
					id: crypto.randomUUID(),
					status: 'success',
					title: 'Success',
					description: code,
				}),
			);
			return {
				user: data.user,
				code,
			};
		} catch (error) {
			const { data } = error as AuthResponseError;
			dispatch(
				addAlert({
					id: crypto.randomUUID(),
					status: 'danger',
					title: 'Error',
					description: data.code,
				}),
			);
		}
	};

	const logoutData = async () => {
		try {
			const { code } = await logout().unwrap();
			localStorage.removeItem('auth_token');
			dispatch(setIsAuthenticated(false));
			dispatch(userApi.util.invalidateTags(['User']));
			dispatch(
				addAlert({
					id: crypto.randomUUID(),
					status: 'success',
					title: 'Success',
					description: code,
				}),
			);
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
