'use client';
import { Button } from '@heroui/button';

import { Navbar, NavbarBrand, NavbarContent, NavbarItem } from '@heroui/navbar';
import { Tooltip } from '@heroui/tooltip';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import type { FC } from 'react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useUser } from '@/entities';
import {
	LanguageSwitcher,
	LoginModal,
	SignUpModal,
	ThemeSwitcher,
	useAuth,
} from '@/features';
import { classNames } from '@/shared/lib/helpers';
import { useScroll } from '@/shared/lib/hooks';
import type { RootState } from '@/shared/lib/store';
import { Logotype } from '@/shared/ui/icons/logotype';
import { buildHeaderGradient, detectSeason } from '../model/header.utils';
import type { HeaderProps } from '../model/types';
import { HeaderNavItems } from './HeaderNavItems';

export const Header: FC<HeaderProps> = ({ height }) => {
	const { t: tCommon } = useTranslation('common');
	const { logoutData, isLogoutLoading } = useAuth();
	const isAuthenticated = useSelector(
		(state: RootState) => state.auth.isAuthenticated,
	);
	const { isUserLoading } = useUser();
	const { theme } = useTheme();
	const season = detectSeason(new Date());
	const gradient = buildHeaderGradient(
		season,
		(theme as 'light' | 'dark') ?? 'light',
	);

	const scrollY = useScroll('y');
	const isScrolled = scrollY > 4;
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	const handleLogout = async () => {
		await logoutData();
	};

	const renderContent = () => {
		return (
			<NavbarContent
				style={{
					transition: 'all .5s',
					filter: isUserLoading ? 'blur(15px)' : 'none',
				}}
				justify="center"
			>
				<NavbarItem className="hidden sm:block">
					<ThemeSwitcher />
				</NavbarItem>
				<NavbarItem className="hidden sm:block">
					<LanguageSwitcher />
				</NavbarItem>
				{isAuthenticated ? (
					<NavbarItem>
						<Button onPress={handleLogout} isLoading={isLogoutLoading}>
							{tCommon('logout')}
						</Button>
					</NavbarItem>
				) : (
					<>
						<NavbarItem>
							<LoginModal />
						</NavbarItem>
						<NavbarItem>
							<SignUpModal />
						</NavbarItem>
					</>
				)}
			</NavbarContent>
		);
	};

	return (
		<div className="w-full">
			<Navbar
				isMenuOpen={isMenuOpen}
				onMenuOpenChange={setIsMenuOpen}
				style={{ height, background: gradient }}
				className={classNames(
					'overflow-visible sticky top-0 z-50 transition-all duration-300',
					{},
					[isScrolled ? 'backdrop-blur-md shadow-lg' : ''],
				)}
			>
				<NavbarBrand>
					<Tooltip
						content={tCommon('app_name')}
						delay={0}
						showArrow
						radius="sm"
					>
						<Link
							prefetch
							href="/"
							aria-label={tCommon('app_name')}
							className="flex items-center gap-2 text-lg font-semibold tracking-tight opacity-90 hover:opacity-100 transition-opacity duration-300 ease-out"
						>
							<Logotype />
						</Link>
					</Tooltip>
				</NavbarBrand>
				<HeaderNavItems />
				{renderContent()}
			</Navbar>
		</div>
	);
};
