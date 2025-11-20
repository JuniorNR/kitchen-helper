'use client';
import {
	useLoginMutation,
	useLogoutMutation,
	useSignUpMutation,
} from './auth.api';
import type { LoginFormData, SignUpFormData } from './auth.types';

export const useAuth = () => {
	const [signUp, { isLoading: isSignUpLoading }] = useSignUpMutation();
	const [login, { isLoading: isLoginLoading }] = useLoginMutation();
	const [logout, { isLoading: isLogoutLoading }] = useLogoutMutation();

	const signUpData = async (dataToSend: SignUpFormData) => {
		try {
			const { data } = await signUp(dataToSend).unwrap();
			return data.user;
		} catch {
			return null;
		}
	};

	const loginData = async (dataToSend: LoginFormData) => {
		try {
			const { data, code } = await login(dataToSend).unwrap();
			return {
				user: data.user,
				code,
			};
		} catch {
			return null;
		}
	};

	const logoutData = async () => {
		try {
			await logout().unwrap();
		} catch {
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
