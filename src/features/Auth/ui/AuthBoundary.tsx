'use client';

import type { PropsWithChildren } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useUser } from '@/entities';
import type { RootState } from '@/shared/lib/store/store';

export const AuthBoundary = ({ children }: PropsWithChildren) => {
	const { t: tCommon } = useTranslation('common');
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
				{!isUserLoading && tCommon('user_not_authorized')}
			</div>
		);
	}

	return <>{children}</>;
};
