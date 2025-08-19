'use client';

import {
	Button,
	Dropdown,
	DropdownItem,
	DropdownMenu,
	DropdownTrigger,
} from '@heroui/react';
import { useTranslation } from 'react-i18next';

export const LanguageSwitcher = () => {
	const { i18n } = useTranslation('common');
	const current = i18n.resolvedLanguage || i18n.language;

	return (
		<Dropdown>
			<DropdownTrigger>
				<Button className="capitalize" variant="bordered">
					{current.toUpperCase()}
				</Button>
			</DropdownTrigger>
			<DropdownMenu
				disallowEmptySelection
				aria-label="Single selection example"
				selectedKeys={current}
				selectionMode="single"
				variant="flat"
				onSelectionChange={() => i18n.changeLanguage('en')}
			>
				<DropdownItem key="ru" onPress={() => i18n.changeLanguage('ru')}>
					RU
				</DropdownItem>
				<DropdownItem key="en" onPress={() => i18n.changeLanguage('en')}>
					EN
				</DropdownItem>
			</DropdownMenu>
		</Dropdown>
	);
};
