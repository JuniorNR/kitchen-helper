import type { FC } from 'react';
import type { KbdProps } from '../model/kbd.types';

export const Kbd: FC<KbdProps> = ({ shortcut, className = '' }) => {
	if (Array.isArray(shortcut)) {
		return (
			<div
				className={`flex opacity-0 group-hover:opacity-100 transition-opacity ${className}`}
			>
				{shortcut.map((key, index) => {
					const itemsLength = shortcut.length;
					return (
						<div key={key}>
							<kbd className="px-1.5 py-0.5 bg-default-100 dark:bg-default-50 rounded text-xs">
								{key}
							</kbd>
							{index !== itemsLength - 1 ? '+' : ''}
						</div>
					);
				})}
			</div>
		);
	}

	return (
		<div className={className}>
			<kbd className="px-1.5 py-0.5 bg-default-100 dark:bg-default-50 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity">
				{shortcut}
			</kbd>
		</div>
	);
};
