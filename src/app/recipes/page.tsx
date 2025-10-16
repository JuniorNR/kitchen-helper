'use client';

import { Tab, Tabs } from '@heroui/tabs';
import dynamic from 'next/dynamic';
import { type Key, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useRecipe } from '@/entities';

// import { RecipeCreate, RecipesList } from '@/features';

const RecipeCreate = dynamic(
	() => import('@/features/RecipeCreate').then((m) => m.RecipeCreate),
	{ ssr: false },
);

const RecipesList = dynamic(
	() => import('@/features/RecipesList').then((m) => m.RecipesList),
	{ ssr: false },
);

export default function RecipesPage() {
	const { t: tCommon } = useTranslation('common');
	const { recipes } = useRecipe();
	const [selectedKey, setSelectedKey] = useState<Key>('/recipes-list');
	const [created, setCreated] = useState<boolean>(false);
	const tabStyles = 'w-[75%] flex items-center justify-center';

	useEffect(() => {
		if (created) {
			setSelectedKey('/recipes-list');
			setCreated(false);
		}
	}, [created]);

	useEffect(() => {
		if (recipes?.length === 0) {
			setSelectedKey('/recipe-create');
		}
	}, [recipes]);

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
				key="/recipes-list"
				title={tCommon('page_titles.recipe_list')}
				className={tabStyles}
				disabled={recipes?.length === 0}
			>
				<RecipesList />
			</Tab>
		</Tabs>
	);
}
