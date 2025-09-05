'use client';
import { Button } from '@heroui/button';
import {
	Table,
	TableBody,
	TableCell,
	TableColumn,
	TableHeader,
	TableRow,
} from '@heroui/table';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { type Ingredient, useIngredient } from '@/entities';

export const IngredientsTable = () => {
	const { t: tIngredients } = useTranslation('ingredients');
	const { t: tUnits } = useTranslation('units');
	const { t: tCommon } = useTranslation('common');
	const { ingredients, isLoading, deleteIngredientData } = useIngredient();
	const [isDeleteLoadingIngredient, setIsDeleteLoadingIngredient] = useState<
		string | null
	>(null);

	const prepareIngredientsList = useMemo(() => {
		if (ingredients) {
			return ingredients.map((ingredient) => ({
				id: ingredient.id,
				title: ingredient.title,
				description: ingredient.description,
				category: ingredient.category,
				unit: ingredient.unit,
				count: ingredient.countUnit,
				price: ingredient.price,
				currency: ingredient.currency,
				createdAt: ingredient.createdAt,
			}));
		}

		return [];
	}, [ingredients]);

	const prepareCurrency = (
		currency: Ingredient['currency'],
		price: Ingredient['price'],
	) => {
		switch (currency.toLowerCase()) {
			case 'usd':
				return `$ ${price}`;
			case 'eur':
				return `€ ${price}`;
			default:
				return `₽ ${price}`;
		}
	};

	const handleDeleteIngredient = async (id: string) => {
		try {
			setIsDeleteLoadingIngredient(id);
			await deleteIngredientData(id);
		} catch (_) {
			return null;
		} finally {
			setIsDeleteLoadingIngredient(null);
		}
	};

	return (
		<div
			className="h-full w-full transition-all duration-300"
			style={{ filter: isLoading ? 'blur(10px)' : 'none' }}
		>
			<h1 className="text-2xl font-bold mb-2">
				{tCommon('page_titles.ingredient_list')}
			</h1>
			<Table
				aria-label="Table of ingredients"
				fullWidth
				selectionMode="single"
				color="primary"
			>
				<TableHeader>
					<TableColumn className="text-center">
						{tIngredients('table.title')}
					</TableColumn>
					<TableColumn className="text-center">
						{tIngredients('table.description')}
					</TableColumn>
					<TableColumn className="text-center">
						{tIngredients('table.category')}
					</TableColumn>
					<TableColumn className="text-center">
						{tIngredients('table.count')}
					</TableColumn>
					<TableColumn className="text-center">
						{tIngredients('table.price')}
					</TableColumn>
					<TableColumn className="text-center">
						{tIngredients('table.createdAt')}
					</TableColumn>
					<TableColumn className="text-center">
						{tIngredients('table.actions')}
					</TableColumn>
				</TableHeader>
				<TableBody>
					{prepareIngredientsList.map((ingredient) => (
						<TableRow key={ingredient.createdAt}>
							<TableCell>{ingredient.title}</TableCell>
							<TableCell>{ingredient.description}</TableCell>
							<TableCell>
								{tIngredients(`labels.${ingredient.category}`)}
							</TableCell>
							<TableCell>
								{`${ingredient.count} ${tUnits(`labels.${ingredient.unit}`)}`}
							</TableCell>
							<TableCell>
								{prepareCurrency(ingredient.currency, ingredient.price)}
							</TableCell>
							<TableCell>
								{format(new Date(ingredient.createdAt), 'dd.MM.yyyy HH:mm', {
									locale: ru,
								})}
							</TableCell>
							<TableCell>
								<Button
									color="danger"
									size="sm"
									isLoading={isDeleteLoadingIngredient === ingredient.id}
									onPress={() => handleDeleteIngredient(ingredient.id)}
								>
									{tIngredients('table.delete')}
								</Button>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	);
};
