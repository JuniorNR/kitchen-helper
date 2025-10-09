import type { RecipeCreateFormInputType } from '@/features/RecipeCreate/model/recipeCreate.schema';

export function buildRecipeCreateFormData(
	input: RecipeCreateFormInputType,
): FormData {
	const formData = new FormData();

	const toSnakeCase = (key: string) =>
		key
			.split(/(?<=[a-z0-9])(?=[A-Z])/)
			.join('_')
			.toLowerCase();

	const { images, steps, ...rest } = input;

	Object.entries(rest).forEach(([key, value]) => {
		formData.append(toSnakeCase(key), String(value ?? ''));
	});

	steps.forEach((step, stepIndex) => {
		Object.entries(step).forEach(([key, value]) => {
			if (key === 'ingredients') {
				step.ingredients.forEach((ingredient, ingredientIndex) => {
					formData.append(
						`steps[${stepIndex}][ingredients][${ingredientIndex}][id]`,
						String(ingredient.id),
					);
					formData.append(
						`steps[${stepIndex}][ingredients][${ingredientIndex}][amount]`,
						String(ingredient.amount),
					);
				});
			} else {
				formData.append(
					`steps[${stepIndex}][${toSnakeCase(key)}]`,
					String(value ?? ''),
				);
			}
		});
	});

	images.forEach((image, imageIndex) => {
		formData.append(`images[${imageIndex}][file]`, image.file);
		formData.append(`images[${imageIndex}][is_main]`, image.isMain ? '1' : '0');
		formData.append(`images[${imageIndex}][position]`, String(image.position));
	});

	return formData;
}
