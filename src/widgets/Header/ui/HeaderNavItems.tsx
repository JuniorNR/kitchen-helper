'use client';
import { NavbarItem } from '@heroui/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/helpers';
import { NAV_ITEMS } from '../model/constants';

export const HeaderNavItems = () => {
	const { t } = useTranslation('common');
	const pathname = usePathname();

	return (
		<>
			{NAV_ITEMS.map((item) => {
				const isActive = item.href === pathname;
				return (
					<NavbarItem
						className={classNames(
							'',
							{
								['text-blue-700']: isActive,
							},
							['hover:text-blue-500', 'transition-colors', 'duration-300'],
						)}
						key={item.href}
						isActive={isActive}
					>
						<Link href={item.href}>{t(item.labelKey)}</Link>
					</NavbarItem>
				);
			})}
		</>
	);
};
