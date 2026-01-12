import { Card, CardBody } from '@heroui/card';
import Image from 'next/image';
import type { Recipe, RecipeImage } from '@/entities/recipe';
import { Typography } from '@/shared/ui';

interface RecipesListSSRProps {
	recipes: Recipe[];
}

/**
 * SSR компонент для отображения списка рецептов
 *
 * Преимущества SSR:
 * 1. Данные получаются на сервере - быстрая первая загрузка
 * 2. SEO-оптимизация - контент доступен поисковым системам
 * 3. Меньше нагрузки на клиент - данные уже готовы
 * 4. Лучшая производительность для статического контента
 *
 * Этот компонент НЕ использует:
 * - 'use client' директиву
 * - useState, useEffect, useQuery и другие клиентские хуки
 * - Интерактивность (обработчики событий)
 */
export async function RecipesListSSR({ recipes }: RecipesListSSRProps) {
	if (!recipes || recipes.length === 0) {
		return (
			<div className="flex flex-col items-center justify-center py-12">
				<Typography component="p" classNameComponent="text-default-500">
					Рецепты не найдены
				</Typography>
			</div>
		);
	}

	return (
		<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
			{recipes.map((recipe) => {
				const mainImage =
					recipe.images?.find((img: RecipeImage) => img.isMain) ||
					recipe.images?.[0];

				return (
					<Card
						key={recipe.id}
						className="h-full hover:shadow-lg transition-shadow duration-300"
						radius="lg"
					>
						<CardBody className="p-0">
							{mainImage && (
								<div className="relative w-full h-48 overflow-hidden rounded-t-lg">
									<Image
										src={mainImage.path}
										alt={recipe.title}
										fill
										className="object-cover"
										sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
									/>
								</div>
							)}
							<div className="p-4">
								<Typography
									component="h3"
									classNameComponent="text-lg font-bold mb-2 line-clamp-2"
								>
									{recipe.title}
								</Typography>
								<Typography
									component="p"
									classNameComponent="text-sm text-default-600 dark:text-default-400 mb-4 line-clamp-3"
								>
									{recipe.description}
								</Typography>
								<div className="flex flex-wrap gap-2 text-xs text-default-500">
									{recipe.calories && <span>🔥 {recipe.calories} ккал</span>}
									{recipe.priceOfDish && <span>💰 {recipe.priceOfDish} ₽</span>}
									{recipe.steps?.length > 0 && (
										<span>📝 {recipe.steps.length} шагов</span>
									)}
								</div>
							</div>
						</CardBody>
					</Card>
				);
			})}
		</div>
	);
}
