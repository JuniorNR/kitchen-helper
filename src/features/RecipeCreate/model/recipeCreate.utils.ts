import type { TFunction } from 'i18next';

const RECIPE_TYPE_GROUPS = {
	appetizers: ['appetizer', 'canape-tapas', 'bruschetta-crostini'],
	salads: ['salad'],
	soups: ['soup', 'cream-soup', 'cold-soup', 'broth'],
	'stews-curries': ['stew', 'curry'],
	mains: ['main', 'side'],
	'pasta-noodles-rice': ['pasta', 'noodles', 'rice-dish', 'risotto', 'pilaf'],
	'dumplings-stuffed': ['dumplings', 'stuffed'],
	'bakes-casseroles': ['casserole', 'bake-roast'],
	'grill-stir-braise': ['grill-bbq', 'stir-fry', 'braised', 'slow-cooker'],
	'street-food': ['sandwich-burger', 'wrap-roll', 'taco-burrito', 'pizza'],
	proteins: ['meat', 'poultry', 'fish-seafood'],
	'veg-mushroom': ['vegetable', 'mushroom'],
	'bakery-savoury': ['bread-bakery', 'pie-savoury', 'tart-quiche', 'pastry'],
	'bakery-sweet': [
		'pie-sweet',
		'cookies',
		'cake',
		'cupcake-muffin',
		'pancake-crepe',
	],
	desserts: ['dessert', 'ice-cream', 'pudding', 'jelly-mousse'],
	'sauces-condiments': ['sauce', 'dressing', 'dip-spread', 'marinade'],
	'preserves-pickles': ['jam-preserve', 'pickles-fermented'],
	'grains-cereals': ['grain-cereal', 'porridge'],
	beverages: ['beverage', 'smoothie', 'cocktail-mocktail'],
} as const;

export const getGroupedOptions = (t: TFunction<'recipes'>) =>
	Object.entries(RECIPE_TYPE_GROUPS).map(([groupId, keys]) => ({
		label: t(`groups.${groupId}`),
		options: keys.map((key) => ({
			value: key,
			label: t(`labels.${key}`),
		})),
	}));
