import { Slider, type SliderProps } from '@heroui/slider';
import type { FC } from 'react';

export const Range: FC<SliderProps> = ({ className, ...props }) => {
	return (
		<Slider
			className={`px-5 py-3 rounded-2xl border border-gray-300 bg-gray-50 text-gray-800 shadow-sm ring-1 ring-gray-200/60 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 dark:ring-white/10 ${className}`}
			{...props}
		/>
	);
};
