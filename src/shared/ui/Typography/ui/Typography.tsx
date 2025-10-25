import { Tooltip } from '@heroui/tooltip';
import type { FC } from 'react';
import type { TypographyProps } from '../model/typography.types';
import styles from './typography.module.scss';

export const Typography: FC<TypographyProps> = ({
	children,
	component = 'p',
	className = '',
	tooltip = false,
	maxLength = null,
	lineClamp = null,
	hideLargeText = false,
}) => {
	const isShowLargeText = hideLargeText && !tooltip ? styles.clampIsShow : '';
	const lineClampClass = lineClamp ? `line-clamp-${lineClamp}` : '';
	const renderComponent = (
		children: TypographyProps['children'],
		type: TypographyProps['component'],
	) => {
		const preparedChildren = (text: TypographyProps['children']) => {
			if (maxLength) {
				return text?.length > maxLength
					? `${text.slice(0, maxLength)}...`
					: text;
			}
			return text;
		};
		switch (type) {
			case 'h1':
				return (
					<h1 className="text-2xl font-bold w-fit">
						{preparedChildren(children)}
					</h1>
				);
			case 'h2':
				return (
					<h2 className="text-xl font-bold w-fit">
						{preparedChildren(children)}
					</h2>
				);
			case 'h3':
				return (
					<h3 className="text-lg font-bold w-fit">
						{preparedChildren(children)}
					</h3>
				);
			case 'h4':
				return (
					<h4 className="text-base font-bold w-fit">
						{preparedChildren(children)}
					</h4>
				);
			case 'h5':
				return (
					<h5 className="text-sm font-bold w-fit">
						{preparedChildren(children)}
					</h5>
				);
			case 'h6':
				return (
					<h6 className="text-xs font-bold w-fit">
						{preparedChildren(children)}
					</h6>
				);
			case 'span':
				return (
					<span className="text-sm text-neutral-600 dark:text-neutral-400 w-fit">
						{preparedChildren(children)}
					</span>
				);
			default:
				return (
					<p className="text-sm text-neutral-600 dark:text-neutral-400 w-fit">
						{preparedChildren(children)}
					</p>
				);
		}
	};
	return (
		<div className={`${className} ${isShowLargeText} ${lineClampClass}`}>
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
