'use client';

import { Tab, Tabs } from '@heroui/tabs';
import { type Key, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { RecipeCreate } from '@/features';

export default function RecipesPage() {
	const { t: tCommon } = useTranslation('common');
	const [selectedKey, setSelectedKey] = useState<Key>('/recipe-create');
	const [created, setCreated] = useState<boolean>(false);
	const tabStyles = 'w-[75%] h-full flex items-center justify-center';

	useEffect(() => {
		if (created) {
			setSelectedKey('/recipe-list');
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
				key="/recipe-create"
				title={tCommon('page_titles.recipe_create')}
				className={tabStyles}
			>
				<RecipeCreate setCreated={setCreated} />
			</Tab>
			<Tab
				key="/recipe-list"
				title={tCommon('page_titles.recipe_list')}
				className={tabStyles}
			>
				1234
			</Tab>
		</Tabs>
	);
}
