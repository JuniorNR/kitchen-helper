import type { FC } from 'react';
import { Typography } from '../../Typography';
import type { FilterGroupProps } from '../model/filter.types';

export const FilterGroup: FC<FilterGroupProps> = ({ children, title }) => {
	return (
		<div className="relative w-full rounded-2xl border border-gray-200 bg-white/60 p-4 shadow-sm ring-1 ring-gray-200/60 dark:border-white/10 dark:bg-white/5 dark:ring-white/10 overflow-hidden">
			<div className="mb-3 flex items-center gap-2">
				<span className="inline-block h-2 w-2 rounded-full bg-blue-500/60 dark:bg-blue-400/70" />
				<Typography
					component="h4"
					className="!mb-0 text-[14px] font-semibold text-neutral-800 dark:text-neutral-100"
				>
					{title}
				</Typography>
			</div>
			<div className="grid grid-cols-1 xl:grid-cols-2 gap-3">{children}</div>
		</div>
	);
};
