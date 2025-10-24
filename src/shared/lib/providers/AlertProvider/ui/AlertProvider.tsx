import type { FC } from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '@/shared/lib/store/store';
import { Alerts } from '@/shared/ui';
import type { AlertProviderProps } from '../model/AlertProvider.types';

export const AlertProvider: FC<AlertProviderProps> = ({ children }) => {
	const alerts = useSelector((state: RootState) => state.alert.alerts);
	return (
		<>
			{children}
			<Alerts
				className="max-[520px]:hidden"
				alerts={alerts}
				autoCloseMS={5000}
			/>
		</>
	);
};
