'use client';
import { Navbar, NavbarBrand, NavbarContent, NavbarItem } from '@heroui/navbar';
import { Button, Tooltip, useDisclosure } from '@heroui/react';
import Link from 'next/link';
import type { FC } from 'react';
import { useTranslation } from 'react-i18next';
import {
	LanguageSwitcher,
	LoginModal,
	SignUpModal,
	ThemeSwitcher,
} from '@/features';
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
	const { t } = useTranslation('common');
	return (
		<Navbar style={{ height }}>
			<NavbarBrand>
				<Tooltip content={t('app_name')} delay={0} showArrow radius="sm">
					<Link href="/" className="flex items-center gap-3 text-base">
						<AcmeLogo />
					</Link>
				</Tooltip>
			</NavbarBrand>
			<NavbarContent className="sm:flex gap-4" justify="center">
				<HeaderNavItems />
			</NavbarContent>
			<NavbarContent justify="center">
				<NavbarItem>
					<ThemeSwitcher />
				</NavbarItem>
				<NavbarItem>
					<LanguageSwitcher />
				</NavbarItem>
				<NavbarItem>
					<LoginModal />
				</NavbarItem>
				<NavbarItem>
					<SignUpModal />
				</NavbarItem>
			</NavbarContent>
		</Navbar>
	);
};
