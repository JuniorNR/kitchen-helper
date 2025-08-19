'use client';

import {
	Button,
	Dropdown,
	DropdownItem,
	DropdownMenu,
	DropdownTrigger,
} from '@heroui/react';
import { t } from 'i18next';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export function ThemeSwitcher() {
	const [mounted, setMounted] = useState(false);
	const { theme, setTheme } = useTheme();

	useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted) return null;

	return (
		<Dropdown>
			<DropdownTrigger>
				<Button className="capitalize" variant="bordered">
					{t(`header.theme.${theme}`)}
				</Button>
			</DropdownTrigger>
			<DropdownMenu
				disallowEmptySelection
				aria-label="Single selection example"
				selectedKeys={theme}
				selectionMode="single"
				variant="flat"
				onSelectionChange={() =>
					setTheme((prev) => (prev === 'light' ? 'dark' : 'light'))
				}
			>
				<DropdownItem key="ru" onPress={() => setTheme('light')}>
					{t('header.theme.light')}
				</DropdownItem>
				<DropdownItem key="en" onPress={() => setTheme('dark')}>
					{t('header.theme.dark')}
				</DropdownItem>
			</DropdownMenu>
		</Dropdown>
	);
}
