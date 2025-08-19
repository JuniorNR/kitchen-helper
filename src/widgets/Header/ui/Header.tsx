'use client';
import {
	Button,
	Navbar,
	NavbarBrand,
	NavbarContent,
	NavbarItem,
	Tooltip,
} from '@heroui/react';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { LanguageSwitcher, ThemeSwitcher } from '@/features';

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

export const Header = () => {
	const { t } = useTranslation('common');
	return (
		<Navbar height="100px">
			<NavbarBrand>
				<Tooltip content={t('appName')} delay={0} showArrow radius="sm">
					<Link href="/" className="flex items-center gap-3 text-base">
						<AcmeLogo />
					</Link>
				</Tooltip>
			</NavbarBrand>
			<NavbarContent className="sm:flex gap-4" justify="center">
				<NavbarItem>
					<Link color="foreground" href="#">
						{t('header.recipes')}
					</Link>
				</NavbarItem>
				<NavbarItem isActive>
					<Link aria-current="page" href="#">
						{t('header.ingredients')}
					</Link>
				</NavbarItem>
				<NavbarItem>
					<Link color="foreground" href="#">
						{t('header.add_recipe')}
					</Link>
				</NavbarItem>
				<NavbarItem>
					<Link color="foreground" href="#">
						{t('header.settings')}
					</Link>
				</NavbarItem>
			</NavbarContent>
			<NavbarContent justify="center">
				<NavbarItem>
					<ThemeSwitcher />
				</NavbarItem>
				<NavbarItem>
					<LanguageSwitcher />
				</NavbarItem>
				<NavbarItem>
					<Button as={Link} color="primary" href="/login" variant="bordered">
						{t('login')}
					</Button>
				</NavbarItem>
				<NavbarItem>
					<Button as={Link} color="primary" href="/registration" variant="flat">
						{t('signUp')}
					</Button>
				</NavbarItem>
			</NavbarContent>
		</Navbar>
	);
};
