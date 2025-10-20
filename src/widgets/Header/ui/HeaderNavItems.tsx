'use client';
import { NavbarItem } from '@heroui/navbar';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/helpers';
import { NAV_ITEMS } from '../model/constants';

export const HeaderNavItems = () => {
	const { t } = useTranslation('common');
	const pathname = usePathname();
	const router = useRouter();

	useEffect(() => {
		NAV_ITEMS.forEach((item) => {
			if (item.href !== pathname) {
				router.prefetch(item.href);
			}
		});
	}, [pathname, router]);

	return (
		<>
			{NAV_ITEMS.map((item) => {
				const isActive = item.href === pathname;
				return (
					<NavbarItem
						className={classNames('', {}, [
							'transition-colors',
							'duration-300',
						])}
						key={item.href}
						isActive={isActive}
					>
						<Link
							href={item.href === '/market' ? '' : item.href} // TODO: remove this after market is implemented
							aria-current={isActive ? 'page' : undefined}
							className={classNames(
								'px-3 py-1 rounded-full outline-none transition-colors duration-300 ease-out',
								{
									['bg-blue-500/10 text-blue-700 dark:text-blue-400']: isActive,
								},
								[
									'hover:bg-blue-500/10 hover:text-blue-600 dark:hover:text-blue-300',
									'focus-visible:ring-2 focus-visible:ring-blue-400/60 focus-visible:ring-offset-2',
								],
							)}
						>
							{t(item.labelKey)}{' '}
							{item.href === '/market' ? ' (work in progress)' : ''}
							{/* // TODO: remove this after market is implemented */}
						</Link>
					</NavbarItem>
				);
			})}
		</>
	);
};
