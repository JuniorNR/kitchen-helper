'use client';

import { Tab, Tabs } from '@heroui/tabs';
import { type Key, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { IngredientCreate, IngredientsTable } from '@/features';

export default function ingredientsPage() {
	const { t: tCommon } = useTranslation('common');
	const [selectedKey, setSelectedKey] = useState<Key>('/ingredient-list');
	const [created, setCreated] = useState<boolean>(false);
	const tabStyles = 'w-[75%] h-full flex items-center justify-center';

	useEffect(() => {
		if (created) {
			setSelectedKey('/ingredient-list');
			setCreated(false);
		}
	}, [created]);

	return (
		<Tabs
			variant="bordered"
			color="primary"
			aria-label="Options"
			selectedKey={String(selectedKey)}
			onSelectionChange={(key) => setSelectedKey(key)}
		>
			<Tab
				key="/ingredient-create"
				title={tCommon('page_titles.ingredient_create')}
				className={tabStyles}
			>
				<IngredientCreate setCreated={setCreated} />
			</Tab>
			<Tab
				key="/ingredient-list"
				title={tCommon('page_titles.ingredient_list')}
				className={tabStyles}
			>
				<IngredientsTable />
			</Tab>
		</Tabs>
	);
}
