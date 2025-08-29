'use client';

import type { PropsWithChildren } from 'react';
import { useSelector } from 'react-redux';
import { useUser } from '@/entities';
import type { RootState } from '@/shared/lib/store/store';

export const AuthBoundary = ({ children }: PropsWithChildren) => {
	const { isUserLoading } = useUser();
	const isAuthenticated = useSelector(
		(state: RootState) => state.auth.isAuthenticated,
	);

	if (!isAuthenticated) {
		return (
			<div
				style={{
					filter: isUserLoading ? 'blur(10px)' : 'none',
				}}
				className="w-full transition-all duration-300 h-full flex items-center justify-center p-6 text-danger text-xl"
			>
				{!isUserLoading && 'Пользователь не авторизован'}
			</div>
		);
	}

	return <>{children}</>;
};
