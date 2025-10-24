'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { type FC, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { removeAlert } from '@/features/Alert';
import type { AlertsProps } from '../model/alert.types';
import { Alert } from './Alert';

export const Alerts: FC<AlertsProps> = ({ alerts, autoCloseMS, className }) => {
	const { t: tAlerts } = useTranslation('alerts');
	const timeoutsRef = useRef<Record<string, ReturnType<typeof setTimeout>>>({});
	const dispatch = useDispatch();

	const prepareStatus = (status: string) => {
		switch (status) {
			case 'success':
				return 'success';
			case 'danger':
				return 'danger';
			case 'warning':
				return 'warning';
			case 'info':
				return 'primary';
			default:
				return 'default';
		}
	};

	useEffect(() => {
		if (autoCloseMS) {
			alerts.forEach((alert) => {
				timeoutsRef.current[alert.id] = setTimeout(() => {
					dispatch(removeAlert(alert.id));
				}, autoCloseMS);
			});
		}
	}, [alerts, dispatch, autoCloseMS]);

	useEffect(() => {
		return () => {
			Object.values(timeoutsRef.current).forEach((timeout) => {
				clearTimeout(timeout);
			});
		};
	}, []);

	return (
		<div
			className={`fixed bottom-10 right-15 w-[400px] z-100 transition-all duration-300 ${className}`}
		>
			<AnimatePresence initial={false}>
				{alerts.map((alert) => (
					<motion.div
						key={alert.id}
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.3 }}
					>
						<Alert
							id={alert.id}
							className="mb-5"
							variant="solid"
							color={prepareStatus(alert.status)}
							title={tAlerts(`titles.${alert.title?.toString().toLowerCase()}`)}
							description={tAlerts(
								`codes.${alert.description?.toString().toUpperCase()}`,
							)}
						/>
					</motion.div>
				))}
			</AnimatePresence>
		</div>
	);
};
