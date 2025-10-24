'use client';

import { Alert as AlertComponent, type AlertProps } from '@heroui/alert';
import type { FC } from 'react';
import { useDispatch } from 'react-redux';
import { removeAlert } from '@/features/Alert';

export const Alert: FC<AlertProps> = (props) => {
	const { id, title, description } = props;
	const dispatch = useDispatch();

	return (
		<AlertComponent
			className="mb-5 text-wrap"
			title={title}
			description={description}
			onClose={() => dispatch(removeAlert(id ?? ''))}
			{...props}
		/>
	);
};
