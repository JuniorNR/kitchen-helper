import type { TFunction } from 'i18next';
import type { MarketCreateSchemaType } from './marketCreate.schema';

export const introduction = (t: TFunction<'markets'>) => {
	return [
		{
			title: t('create.introductions.branding_title'),
			text: t('create.introductions.branding_description'),
		},
		{
			title: t('create.introductions.seller_title'),
			text: t('create.introductions.seller_description'),
		},
		{
			title: t('create.introductions.themes_title'),
			text: t('create.introductions.themes_description'),
		},
	];
};

export function buildMarketCreateFormData(
	input: MarketCreateSchemaType,
): FormData {
	const formData = new FormData();

	const toSnakeCase = (key: string) =>
		key
			.split(/(?<=[a-z0-9])(?=[A-Z])/)
			.join('_')
			.toLowerCase();

	const { images, factsAboutSeller, themesOfMarket, ...rest } = input;

	Object.entries(rest).forEach(([key, value]) => {
		formData.append(toSnakeCase(key), String(value ?? ''));
	});

	if (factsAboutSeller) {
		const factsArray = factsAboutSeller
			.split(',')
			.map((fact) => fact.trim())
			.filter((fact) => fact.length > 0);

		factsArray.forEach((fact, index) => {
			formData.append(`facts_about_seller[${index}]`, fact);
		});
	}

	if (themesOfMarket) {
		const themesArray = themesOfMarket
			.split(',')
			.map((theme) => theme.trim())
			.filter((theme) => theme.length > 0);

		themesArray.forEach((theme, index) => {
			formData.append(`themes_of_market[${index}]`, theme);
		});
	}

	// Добавляем изображения
	images.forEach((image, imageIndex) => {
		formData.append(`images[${imageIndex}][file]`, image.file);
		formData.append(`images[${imageIndex}][is_main]`, image.isMain ? '1' : '0');
		formData.append(`images[${imageIndex}][position]`, String(image.position));
	});

	return formData;
}
