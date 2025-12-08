'use client';

import { Tab, Tabs } from '@heroui/tabs';
import { type Key, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { RecipeCreate, RecipesList } from '@/features';
import { PageInfoBlock } from '@/shared/ui';

export default function RecipesPage() {
	const { t: tCommon } = useTranslation('common');
	const [selectedKey, setSelectedKey] = useState<Key>('/recipes-list');
	const [created, setCreated] = useState<boolean>(false);
	const tabStyles = 'w-[75%] flex items-center justify-center';

	useEffect(() => {
		if (created) {
			setSelectedKey('/recipes-list');
			setCreated(false);
		}
	}, [created]);

	return (
		<>
			<PageInfoBlock
				version="0.9.0"
				titleDescription={tCommon('recipes.title_description')}
				title={tCommon('recipes.title')}
				description={tCommon('recipes.description')}
			/>
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
					key="/recipes-list"
					title={tCommon('page_titles.recipe_list')}
					className={tabStyles}
				>
					<RecipesList />
				</Tab>
			</Tabs>
		</>
	);
}
