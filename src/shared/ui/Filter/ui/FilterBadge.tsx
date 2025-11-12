import type { FC } from 'react';
import type { FilterBadgeProps } from '../model/filter.types';

export const FilterBadge: FC<FilterBadgeProps> = ({
	className,
	children,
	withoutDeleteButton,
	readOnly,
	compact,
	onDelete,
}) => {
	const gapClass = compact ? 'gap-1' : 'gap-2';
	const containerBase = `group inline-flex items-center ${gapClass} rounded-full border px-2 py-1.5 text-sm font-medium transition-all duration-150 ease-out`;

	const readOnlyClassesViolet =
		'border-violet-300 dark:border-violet-600 bg-gradient-to-r from-violet-50 to-fuchsia-50 dark:from-violet-900/30 dark:to-fuchsia-900/30 text-violet-800 dark:text-violet-100 ring-1 ring-violet-300/40 dark:ring-violet-500/30 shadow-sm cursor-default';
	const readOnlyClassesSky =
		'border-sky-300 dark:border-sky-600 bg-gradient-to-r from-sky-50 via-cyan-50 to-teal-50 text-slate-800 ring-1 ring-sky-200/50 shadow-sm cursor-default dark:text-slate-100 dark:from-slate-800 dark:via-slate-800 dark:to-slate-800 dark:ring-sky-500/30';

	const readOnlyClasses = readOnly ? readOnlyClassesSky : readOnlyClassesViolet;

	const renderDeleteButton = () => {
		if (withoutDeleteButton) return null;
		if (readOnly) return null;
		if (!onDelete) return null;
		return (
			<button
				type="button"
				onClick={onDelete}
				aria-label="Delete"
				className="ml-0.5 inline-flex h-2 w-2 items-center justify-center rounded-full text-gray-500 transition-all duration-150 hover:bg-gray-200 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-300 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-gray-100 dark:focus:ring-gray-600 cursor-pointer"
			>
				<span aria-hidden="true" className="leading-none text-sm">
					×
				</span>
			</button>
		);
	};
	return (
		<div
			key={children}
			className={`${containerBase} ${readOnlyClasses} ${className}`}
		>
			{readOnly ? (
				<span
					aria-hidden="true"
					className="inline-block h-1.5 w-1.5 rounded-full bg-sky-500 dark:bg-sky-400 shadow-[0_0_0_2px_rgba(255,255,255,0.7)] dark:shadow-[0_0_0_2px_rgba(0,0,0,0.4)] transition-transform duration-150 ease-out group-hover:scale-110"
				/>
			) : (
				<span
					aria-hidden="true"
					className={`inline-block h-1.5 w-1.5 rounded-full bg-violet-500 dark:bg-violet-400 shadow-[0_0_0_2px_rgba(255,255,255,0.7)] dark:shadow-[0_0_0_2px_rgba(0,0,0,0.4)]`}
				/>
			)}
			{children}
			{renderDeleteButton()}
		</div>
	);
};
