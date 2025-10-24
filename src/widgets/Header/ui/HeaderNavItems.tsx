'use client';

import { Button } from '@heroui/button';
import {
	Dropdown,
	DropdownItem,
	DropdownMenu,
	DropdownTrigger,
} from '@heroui/dropdown';
import { NavbarContent, NavbarItem } from '@heroui/navbar';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/helpers';
import { NAV_ITEMS } from '../model/constants';

export const HeaderNavItems = () => {
	const { t: tCommon } = useTranslation('common');
	const pathname = usePathname();
	const router = useRouter();

	useEffect(() => {
		NAV_ITEMS.forEach((item) => {
			if (item.href !== pathname) {
				router.prefetch(item.href);
			}
		});
	}, [pathname, router]);

	const renderDropdown = () => {
		return (
			<Dropdown>
				<DropdownTrigger>
					<Button variant="ghost">{tCommon('header.navigation')}</Button>
				</DropdownTrigger>
				<DropdownMenu>
					{NAV_ITEMS.map((item) => {
						const isActive = item.href === pathname;
						return (
							<DropdownItem
								textValue={item.labelKey}
								key={item.href}
								className={`p-0 ${isActive && 'text-blue-700 dark:text-blue-400'}`}
							>
								<Link
									prefetch
									href={item.href === '/market' ? '' : item.href} // TODO: remove this after market is implemented
									className="p-2 block"
									aria-current={isActive ? 'page' : undefined}
								>
									{tCommon(item.labelKey)}
									{item.href === '/market' ? ' (work in progress)' : ''}
									{/* // TODO: remove this after market is implemented */}
								</Link>
							</DropdownItem>
						);
					})}
				</DropdownMenu>
			</Dropdown>
		);
	};

	const renderList = () => {
		return (
			<>
				{NAV_ITEMS.map((item) => {
					const isActive = item.href === pathname;
					return (
						<NavbarItem
							className="transition-colors duration-300"
							key={item.href}
							isActive={isActive}
						>
							<Link
								href={item.href === '/market' ? '' : item.href} // TODO: remove this after market is implemented
								aria-current={isActive ? 'page' : undefined}
								className={classNames(
									'px-3 py-1 rounded-full outline-none transition-colors duration-300 ease-out',
									{
										['bg-blue-500/10 text-blue-700 dark:text-blue-400']:
											isActive,
									},
									[
										'hover:bg-blue-500/10 hover:text-blue-600 dark:hover:text-blue-300',
										'focus-visible:ring-2 focus-visible:ring-blue-400/60 focus-visible:ring-offset-2',
									],
								)}
							>
								{tCommon(item.labelKey)}
								{item.href === '/market' ? ' (work in progress)' : ''}
								{/* // TODO: remove this after market is implemented */}
							</Link>
						</NavbarItem>
					);
				})}
			</>
		);
	};

	return (
		<>
			<NavbarContent className="lg:hidden" justify="end">
				{renderDropdown()}
			</NavbarContent>
			<NavbarContent className="hidden lg:flex gap-4" justify="center">
				{renderList()}
			</NavbarContent>
		</>
	);
};
