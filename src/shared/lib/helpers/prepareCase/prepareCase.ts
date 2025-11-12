export type PrepareCaseTarget = 'camel' | 'snake';

const toSnakeCase = (value: string): string => {
	if (!value) return '';
	return value
		.replace(/([a-z\d])([A-Z])/g, '$1_$2')
		.replace(/([A-Z]+)([A-Z][a-z])/g, '$1_$2')
		.toLowerCase();
};

const toCamelCase = (value: string): string => {
	if (!value) return '';

	// If it's not snake_case, return as-is (already camelCase/PascalCase or other).
	if (!value.includes('_')) return value;

	// For snake_case inputs normalize to lower and then camelize.
	return value
		.toLowerCase()
		.replace(/_+([a-z\d])/g, (_match, ch: string) => ch.toUpperCase())
		.replace(/^_+|_+$/g, '');
};

export const prepareCase = (
	value: string,
	target?: PrepareCaseTarget,
): string => {
	const input = value ?? '';
	if (target === 'snake') return toSnakeCase(input);
	if (target === 'camel') return toCamelCase(input);

	const isLikelySnake = input.includes('_');
	return isLikelySnake ? toCamelCase(input) : toSnakeCase(input);
};
