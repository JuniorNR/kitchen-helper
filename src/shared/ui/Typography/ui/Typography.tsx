import { Tooltip } from '@heroui/tooltip';
import type { FC } from 'react';
import type { TypographyProps } from '../model/typography.types';
import styles from './typography.module.scss';

export const Typography: FC<TypographyProps> = ({
	children,
	component = 'p',
	className = '',
	classNameComponent = '',
	tooltip = false,
	maxLength = null,
	lineClamp = null,
	hideLargeText = false,
	isSecond = false,
}) => {
	const isShowLargeText = hideLargeText && !tooltip ? styles.clampIsShow : '';
	const lineClampClass = lineClamp ? `line-clamp-${lineClamp}` : '';

	const buildClassName = (baseClass: string) => {
		let classes = [baseClass];
		if (classNameComponent) {
			classes = classNameComponent.split(' ');
		}
		if (isSecond) {
			classes.push('text-foreground-600', 'dark:text-foreground-400');
		}
		return classes.join(' ');
	};
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
					<h1 className={buildClassName('text-2xl font-bold w-fit')}>
						{preparedChildren(children)}
					</h1>
				);
			case 'h2':
				return (
					<h2 className={buildClassName('text-xl font-bold w-fit')}>
						{preparedChildren(children)}
					</h2>
				);
			case 'h3':
				return (
					<h3 className={buildClassName('text-lg font-bold w-fit')}>
						{preparedChildren(children)}
					</h3>
				);
			case 'h4':
				return (
					<h4 className={buildClassName('text-base font-bold w-fit')}>
						{preparedChildren(children)}
					</h4>
				);
			case 'h5':
				return (
					<h5 className={buildClassName('text-sm font-bold w-fit')}>
						{preparedChildren(children)}
					</h5>
				);
			case 'h6':
				return (
					<h6 className={buildClassName('text-xs font-bold w-fit')}>
						{preparedChildren(children)}
					</h6>
				);
			case 'span':
				return (
					<span className={buildClassName('text-xs w-fit')}>
						{preparedChildren(children)}
					</span>
				);
			default:
				return (
					<p className={buildClassName('text-sm w-fit')}>
						{preparedChildren(children)}
					</p>
				);
		}
	};

	return (
		<div
			className={`${className ? `${className} ` : ''}${isShowLargeText ? `${isShowLargeText} ` : ''}${lineClampClass ? `${lineClampClass} ` : ''}`}
		>
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
