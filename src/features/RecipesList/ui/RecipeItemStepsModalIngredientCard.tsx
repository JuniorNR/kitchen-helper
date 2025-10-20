import { Button } from '@heroui/button';
import { Card, CardBody, CardHeader } from '@heroui/card';
import { Divider } from '@heroui/divider';
import type { FC } from 'react';
import { useTranslation } from 'react-i18next';
import type { RecipeItemStepsModalIngredientCardProps } from '../model/recipeList.types';

export const RecipeItemStepsModalIngredientCard: FC<
	RecipeItemStepsModalIngredientCardProps
> = ({ ingredient, onClose }) => {
	const { t: tCommon } = useTranslation('common');
	const { t: tUnits } = useTranslation('units');
	const { t: tFields } = useTranslation('fields');
	const { t: tIngredients } = useTranslation('ingredients');

	return (
		<Card className="mt-3 rounded-2xl border border-neutral-200 dark:border-neutral-700 bg-gradient-to-br from-white to-neutral-50/80 dark:from-neutral-900 dark:to-neutral-900/60 shadow-medium">
			<CardHeader className="flex items-start justify-between gap-3 px-4 pt-4 pb-0">
				<h3 className="text-xl font-semibold leading-tight">
					{ingredient.title}
				</h3>
				<Button
					size="sm"
					variant="light"
					className="h-8 w-8 min-w-8 rounded-full border border-transparent hover:border-neutral-200 dark:hover:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-800 text-neutral-500 hover:text-neutral-700 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
					aria-label={tCommon('close')}
					onPress={onClose}
				>
					<span className="text-base leading-none">×</span>
				</Button>
			</CardHeader>
			<CardBody className="px-4 pb-4 pt-2">
				<p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
					{ingredient.description}
				</p>

				<div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
					<div className="rounded-lg bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-200 dark:border-neutral-700 px-3 py-2">
						<span className="block text-[10px] uppercase tracking-wide text-neutral-500 dark:text-neutral-400">
							{tFields('price')}
						</span>
						<div className="mt-0.5 text-base font-semibold">
							{Number(ingredient.price).toFixed(2)}
							<span className="ml-1 text-sm font-normal text-neutral-500 dark:text-neutral-400">
								{tCommon(`currency.${ingredient.currency.toLowerCase()}`)}
							</span>
						</div>
					</div>
					<div className="rounded-lg bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-200 dark:border-neutral-700 px-3 py-2">
						<span className="block text-[10px] uppercase tracking-wide text-neutral-500 dark:text-neutral-400">
							{tFields('amount')}
						</span>
						<div className="mt-0.5 text-base font-semibold">
							{Number(ingredient.usage?.amount).toFixed(1)}
							<span className="ml-1 text-sm font-normal text-neutral-500 dark:text-neutral-400">
								{tUnits(`labels.${ingredient.unit ?? ''}`)}
							</span>
						</div>
					</div>
				</div>

				{ingredient.category ? (
					<>
						<Divider className="my-3" />
						<div className="flex flex-wrap items-center gap-2">
							<span className="inline-flex items-center rounded-full bg-neutral-100 dark:bg-neutral-800 px-2.5 py-1 text-xs text-neutral-700 dark:text-neutral-300">
								{tIngredients(`labels.${ingredient.category ?? ''}`)}
							</span>
						</div>
					</>
				) : null}
			</CardBody>
		</Card>
	);
};
