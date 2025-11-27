import { motion } from 'framer-motion';
import type { FC } from 'react';
import { CheckIcon } from '../../icons/checkIcon';
import { WarningIcon } from '../../icons/warningIcon';
import { Typography } from '../../Typography';
import type { AlertProps } from '../model/alert.types';

const STATUS_STYLES = {
	success: {
		container:
			'border-emerald-300 bg-emerald-50/60 dark:border-emerald-700 dark:bg-emerald-950/30',
		iconWrapper: 'bg-emerald-100 dark:bg-emerald-900/40',
		iconColor: 'text-emerald-600 dark:text-emerald-300',
		titleColor: 'text-emerald-700 dark:text-emerald-200',
		descriptionColor: 'text-emerald-600 dark:text-emerald-300',
		Icon: CheckIcon,
	},
	danger: {
		container:
			'border-danger-300 bg-danger-50/50 dark:border-danger-700 dark:bg-danger-950/30',
		iconWrapper: 'bg-danger-100 dark:bg-danger-900/50',
		iconColor: 'text-danger-600 dark:text-danger-400',
		titleColor: 'text-danger-700 dark:text-danger-300',
		descriptionColor: 'text-danger-600 dark:text-danger-400',
		Icon: WarningIcon,
	},
	warning: {
		container:
			'border-amber-300 bg-amber-50/60 dark:border-amber-700 dark:bg-amber-950/30',
		iconWrapper: 'bg-amber-100 dark:bg-amber-900/40',
		iconColor: 'text-amber-600 dark:text-amber-300',
		titleColor: 'text-amber-700 dark:text-amber-200',
		descriptionColor: 'text-amber-600 dark:text-amber-300',
		Icon: WarningIcon,
	},
	info: {
		container:
			'border-sky-300 bg-sky-50/60 dark:border-sky-700 dark:bg-sky-950/40',
		iconWrapper: 'bg-sky-100 dark:bg-sky-900/40',
		iconColor: 'text-sky-600 dark:text-sky-300',
		titleColor: 'text-sky-700 dark:text-sky-200',
		descriptionColor: 'text-sky-600 dark:text-sky-300',
		Icon: WarningIcon,
	},
	default: {
		container:
			'border-slate-300 bg-slate-50/60 dark:border-slate-700 dark:bg-slate-900/40',
		iconWrapper: 'bg-slate-200 dark:bg-slate-800/60',
		iconColor: 'text-slate-600 dark:text-slate-300',
		titleColor: 'text-slate-700 dark:text-slate-200',
		descriptionColor: 'text-slate-600 dark:text-slate-400',
		Icon: WarningIcon,
	},
} as const;

const mergeClasses = (...classes: Array<string | undefined>) =>
	classes
		.filter((cls): cls is string => Boolean(cls && cls.trim().length))
		.join(' ');

export const Alert: FC<AlertProps> = ({
	title,
	description,
	status,
	className,
}) => {
	const {
		container,
		iconWrapper,
		iconColor,
		titleColor,
		descriptionColor,
		Icon,
	} = STATUS_STYLES[status] ?? STATUS_STYLES.default;

	return (
		<motion.div
			key={status}
			initial={{ opacity: 0, y: 20, scale: 0.95 }}
			animate={{ opacity: 1, y: 0, scale: 1 }}
			exit={{ opacity: 0, y: -20, scale: 0.95 }}
			transition={{ duration: 0.3, ease: 'easeOut' }}
			className={mergeClasses(
				'flex flex-col items-center justify-center gap-6 rounded-2xl border-2 border-dashed p-8 text-center transition-colors',
				container,
				className,
			)}
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
				<div className={mergeClasses('rounded-full p-4 transition-colors', iconWrapper)}>
					<Icon className={mergeClasses('h-12 w-12', iconColor)} />
				</div>
			</motion.div>
			<div className="flex flex-col gap-2 justify-center items-center">
				<Typography
					component="h3"
					className={mergeClasses(
						'text-xl font-semibold w-fit transition-colors',
						titleColor,
					)}
				>
					{title}
				</Typography>
				<Typography
					component="p"
					className={mergeClasses(
						'text-sm w-fit transition-colors',
						descriptionColor,
					)}
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
