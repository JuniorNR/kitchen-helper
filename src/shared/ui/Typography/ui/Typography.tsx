import { Button } from '@heroui/button';
import { Tooltip } from '@heroui/tooltip';
import type { FC } from 'react';
import type { TypographyProps } from '../model/typography.types';

export const Typography: FC<TypographyProps> = ({
	children,
	component = 'p',
	className = '',
	tooltip = false,
}) => {
	const renderComponent = (
		children: React.ReactNode,
		type: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'span' | 'p',
	) => {
		switch (type) {
			case 'h1':
				return <h1 className="text-2xl font-bold w-fit">{children}</h1>;
			case 'h2':
				return <h2 className="text-xl font-bold w-fit">{children}</h2>;
			case 'h3':
				return <h3 className="text-lg font-bold w-fit">{children}</h3>;
			case 'h4':
				return <h4 className="text-base font-bold w-fit">{children}</h4>;
			case 'h5':
				return <h5 className="text-sm font-bold w-fit">{children}</h5>;
			case 'h6':
				return <h6 className="text-xs font-bold w-fit">{children}</h6>;
			case 'span':
				return (
					<span className="text-sm text-neutral-600 dark:text-neutral-400 w-fit">
						{children}
					</span>
				);
			default:
				return (
					<p className="text-sm text-neutral-600 dark:text-neutral-400 w-fit">
						{children}
					</p>
				);
		}
	};
	return (
		<div className={`${className}`}>
			{tooltip ? (
				<Tooltip content={children} closeDelay={0} delay={1000}>
					{renderComponent(children, component)}
				</Tooltip>
			) : (
				renderComponent(children, component)
			)}
		</div>
	);
};
