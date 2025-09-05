'use client';
import { Navbar, NavbarBrand, NavbarContent, NavbarItem } from '@heroui/navbar';
import { Button, Tooltip } from '@heroui/react';
import Link from 'next/link';
import type { FC } from 'react';
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
import type { RootState } from '@/shared/lib/store';
import type { HeaderProps } from '../model/types';
import { HeaderNavItems } from './HeaderNavItems';

export const AcmeLogo = () => {
	return (
		<svg fill="none" height="36" viewBox="0 0 32 32" width="36">
			<title>Header icon</title>
			<path
				clipRule="evenodd"
				d="M17.6482 10.1305L15.8785 7.02583L7.02979 22.5499H10.5278L17.6482 10.1305ZM19.8798 14.0457L18.11 17.1983L19.394 19.4511H16.8453L15.1056 22.5499H24.7272L19.8798 14.0457Z"
				fill="currentColor"
				fillRule="evenodd"
			/>
		</svg>
	);
};

export const Header: FC<HeaderProps> = ({ height }) => {
	const { t: tCommon } = useTranslation('common');
	const { logoutData } = useAuth();
	const isAuthenticated = useSelector(
		(state: RootState) => state.auth.isAuthenticated,
	);
	const { isUserLoading } = useUser();

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
				<NavbarItem>
					<ThemeSwitcher />
				</NavbarItem>
				<NavbarItem>
					<LanguageSwitcher />
				</NavbarItem>
				{isAuthenticated ? (
					<NavbarItem>
						<Button onPress={handleLogout}>{tCommon('logout')}</Button>
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
		<Navbar style={{ height }}>
			<NavbarBrand>
				<Tooltip content={tCommon('app_name')} delay={0} showArrow radius="sm">
					<Link href="/" className="flex items-center gap-3 text-base">
						<AcmeLogo />
					</Link>
				</Tooltip>
			</NavbarBrand>
			<NavbarContent className="sm:flex gap-4" justify="center">
				<HeaderNavItems />
			</NavbarContent>
			{renderContent()}
		</Navbar>
	);
};
