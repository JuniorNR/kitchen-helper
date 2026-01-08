import type { TFunction } from 'i18next';
import z from 'zod';

export const createMarketCreateSchema = (t: TFunction<'validation'>) => {
	return z.object({
		title: z.string().min(5, t('title_required', { min: 5 })),
		description: z.string().min(15, t('description_required', { min: 15 })),
		story: z.string().min(15, t('story_required', { min: 15 })),
		factsAboutSeller: z.string().min(1, t('facts_about_seller_required')),
		themesOfMarket: z.string().min(1, t('themes_of_market_required')),
		images: z
			.array(
				z.object({
					isMain: z.boolean(),
					file: z.file(),
					position: z.number(),
				}),
			)
			.min(1, t('images_required')),
	});
};

export type MarketCreateSchemaType = z.input<
	ReturnType<typeof createMarketCreateSchema>
>;
