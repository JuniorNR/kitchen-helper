import { RecipesListSSR } from '@/features/RecipesList/ui/RecipesListSSR';
import { getRecipesSSR } from '@/features/RecipesList/model/recipesListSSR.server';
import { PageInfoBlock } from '@/shared/ui';
import type { Metadata } from 'next';

/**
 * Пример страницы с полным использованием SSR
 * 
 * Особенности:
 * 1. async функция - выполняется на сервере
 * 2. Получает данные на сервере через getRecipesSSR
 * 3. Рендерит компонент RecipesListSSR (без 'use client')
 * 4. SEO-оптимизирован через metadata
 * 5. Данные кешируются на сервере (revalidate: 60)
 */
export const metadata: Metadata = {
	title: 'Рецепты - Kitchen Helper',
	description: 'Список популярных рецептов',
	openGraph: {
		title: 'Рецепты - Kitchen Helper',
		description: 'Список популярных рецептов',
	},
};

export default async function RecipesSSRPage() {
	// Получаем данные на сервере
	const { data: recipes, pagination } = await getRecipesSSR(1, 9);

	return (
		<div className="flex flex-col items-center w-full max-w-7xl mx-auto px-4 py-8">
			<PageInfoBlock
				version="1.0.0"
				titleDescription="SSR Example"
				title="Рецепты (Server-Side Rendering)"
				description="Эта страница демонстрирует полное использование SSR: данные получаются на сервере, компоненты рендерятся на сервере, контент доступен для SEO"
			/>

			{/* SSR компонент - рендерится на сервере */}
			<RecipesListSSR recipes={recipes} />

			{/* Информация о пагинации (тоже SSR) */}
			<div className="mt-8 text-center text-sm text-default-500">
				Страница {pagination.current_page} из {pagination.last_page} · Всего
				рецептов: {pagination.total}
			</div>
		</div>
	);
}
