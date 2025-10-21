'use client';

import { useTranslation } from 'react-i18next';
import { IngredientCardSkeleton } from '@/features/IngredientsList/ui/IngredientCardSkeleton';

export default function IngredientsLoading() {
	const { t: tCommon } = useTranslation('common');

	return (
		<div className="h-full w-full">
			<h1 className="text-2xl font-bold mb-3">
				{tCommon('page_titles.ingredient_list')}
			</h1>
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
				{[
					'ing-pre1',
					'ing-pre2',
					'ing-pre3',
					'ing-pre4',
					'ing-pre5',
					'ing-pre6',
				].map((key) => (
					<IngredientCardSkeleton key={key} />
				))}
			</div>
		</div>
	);
}
