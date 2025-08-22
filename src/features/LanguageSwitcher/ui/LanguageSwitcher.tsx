'use client';

import {
	Button,
	Dropdown,
	DropdownItem,
	DropdownMenu,
	DropdownTrigger,
} from '@heroui/react';
import { t } from 'i18next';
import { useTranslation } from 'react-i18next';

export const LanguageSwitcher = () => {
	const { i18n } = useTranslation('common');
	const current = i18n.resolvedLanguage || i18n.language;

	return (
		<Dropdown>
			<DropdownTrigger>
				<Button className="capitalize" variant="bordered">
					{t(`language.${current}`)}
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
					{t('language.ru')}
				</DropdownItem>
				<DropdownItem key="en" onPress={() => i18n.changeLanguage('en')}>
					{t('language.en')}
				</DropdownItem>
			</DropdownMenu>
		</Dropdown>
	);
};
