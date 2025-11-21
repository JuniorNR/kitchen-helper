import { Button } from '@heroui/button';
import { motion } from 'framer-motion';
import type { FC } from 'react';
import { WarningIcon } from '../../icons/warningIcon';
import { Typography } from '../../Typography';
import type { AlertProps } from '../model/alert.types';

export const Alert: FC<AlertProps> = ({ title, description, status }) => {
	return (
		<motion.div
			key={status}
			initial={{ opacity: 0, y: 20, scale: 0.95 }}
			animate={{ opacity: 1, y: 0, scale: 1 }}
			exit={{ opacity: 0, y: -20, scale: 0.95 }}
			transition={{ duration: 0.3, ease: 'easeOut' }}
			className="mt-10 flex flex-col items-center justify-center gap-6 rounded-2xl border-2 border-dashed border-danger-300 dark:border-danger-700 bg-danger-50/50 dark:bg-danger-950/30 p-8 text-center"
		>
			<motion.div
				initial={{ scale: 0, rotate: -180 }}
				animate={{ scale: 1, rotate: 0 }}
				transition={{
					duration: 0.5,
					type: 'spring',
					stiffness: 200,
					damping: 15,
				}}
				className="flex items-center justify-center"
			>
				<div className="rounded-full bg-danger-100 dark:bg-danger-900/50 p-4">
					<WarningIcon className="h-12 w-12 text-danger-600 dark:text-danger-400" />
				</div>
			</motion.div>
			<div className="flex flex-col gap-2 justify-center items-center">
				<Typography
					component="h3"
					className="text-xl font-semibold text-danger-700 dark:text-danger-300 w-fit"
				>
					{title}
				</Typography>
				<Typography
					component="p"
					className="text-sm text-danger-600 dark:text-danger-400 w-fit"
				>
					{description}
				</Typography>
			</div>
			{/* <Button
				color="danger"
				variant="flat"
				onPress={() => refetch()}
				className="mt-2"
			>
				{tCommon('retry') || 'Повторить попытку'}
			</Button> */}
		</motion.div>
	);
};
