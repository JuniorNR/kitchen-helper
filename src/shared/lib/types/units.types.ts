export type UnitValue =
	| 'mg'
	| 'g'
	| 'kg'
	| 'ml'
	| 'l'
	| 'tsp'
	| 'tbsp'
	| 'cup50'
	| 'cup100'
	| 'cup150'
	| 'cup200'
	| 'cup250'
	| 'piece'
	| 'clove'
	| 'slice'
	| 'leaf'
	| 'pinch'
	| 'handful'
	| 'bunch'
	| 'pack'
	| 'can'
	| 'bottle';

export interface UnitOption {
	group: string;
	options: {
		value: UnitValue;
		label: string;
	}[];
}
