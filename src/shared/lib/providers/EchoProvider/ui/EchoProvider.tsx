'use client';

import { useSelector } from 'react-redux';
import { initEcho } from '@/shared/lib/configs';
import { localStorageHelper } from '@/shared/lib/helpers';
import type { RootState } from '@/shared/lib/store/store';

export const EchoProvider = ({ children }: { children: React.ReactNode }) => {
	const authState = useSelector((state: RootState) => state.auth);
	const { item: authTokenFromLocalStorage } =
		localStorageHelper<string>('auth_token');

	if (
		authState.isAuthenticated &&
		!authState.authToken &&
		authTokenFromLocalStorage.length === 0
	) {
		console.error('Auth token is required');
	}

	initEcho(authState.authToken || authTokenFromLocalStorage);
	return <>{children}</>;
};
