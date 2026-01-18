import { apiConfig } from '@/configs';
import type { Recipe, RecipeDTO } from '@/entities/recipe';
import { dto } from '@/shared/lib/helpers';
import type { ApiResponse, ApiResponsePaginationDTO } from '@/shared/lib/types';

/**
 * Серверная функция для получения рецептов
 *
 * Используется только на сервере (в Server Components)
 * Не требует авторизации для публичных рецептов
 */
export async function getRecipesSSR(
	page: number = 1,
	limit: number = 9,
): Promise<ApiResponse<Recipe[], ApiResponsePaginationDTO>> {
	const baseUrl = apiConfig.isProd
		? apiConfig.APP_BACKEND_URL_PROD
		: apiConfig.APP_BACKEND_URL;

	try {
		const response = await fetch(
			`${baseUrl}/api/recipes?page=${page}&per_page=${limit}`,
			{
				method: 'GET',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
				},
				// Важно для SSR: кеширование на сервере
				next: {
					revalidate: 60, // Перевалидация каждые 60 секунд
				},
			},
		);

		if (!response.ok) {
			throw new Error(`Failed to fetch recipes: ${response.statusText}`);
		}

		const data: ApiResponse<RecipeDTO[], ApiResponsePaginationDTO> =
			await response.json();

		// Преобразуем DTO в клиентский формат
		return {
			data: dto<RecipeDTO[], Recipe[]>('toClient', data.data),
			pagination: data.pagination,
			code: data.code,
		};
	} catch (error) {
		console.error('Error fetching recipes on server:', error);
		// Возвращаем пустой результат при ошибке
		return {
			data: [],
			pagination: {
				current_page: 1,
				last_page: 1,
				per_page: limit,
				total: 0,
				next: null,
				prev: null,
			},
			code: 'ERROR',
		};
	}
}
