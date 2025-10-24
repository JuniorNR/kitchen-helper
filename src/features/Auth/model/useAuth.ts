'use client';
import { userApi } from '@/entities/user/model/user.api';
import { addAlert } from '@/features/Alert';
import { useAppDispatch } from '@/shared/lib/store';
import { isApiErrorResponse } from '@/shared/lib/types';
import {
	useLoginMutation,
	useLogoutMutation,
	useSignUpMutation,
} from './auth.api';
import { setIsAuthenticated } from './auth.slice';
import type { LoginFormData, SignUpFormData } from './auth.types';

export const useAuth = () => {
	const dispatch = useAppDispatch();
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
		} catch (error: unknown) {
			const code = isApiErrorResponse(error)
				? error.data.code
				: 'UNKNOWN_ERROR';
			dispatch(
				addAlert({
					id: crypto.randomUUID(),
					status: 'danger',
					title: 'Error',
					description: code,
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
