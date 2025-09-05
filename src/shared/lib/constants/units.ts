import type { TFunction } from 'i18next';
import type { UnitOption } from '../types/units.types';

export const getUnitGroupsOptions = (t: TFunction<'units'>): UnitOption[] => {
	return [
		{
			group: t('groups.mass'),
			options: [
				{ value: 'mg', label: t('labels.mg') },
				{ value: 'g', label: t('labels.gr') },
				{ value: 'kg', label: t('labels.kg') },
			],
		},
		{
			group: t('groups.liquid'),
			options: [
				{ value: 'ml', label: t('labels.ml') },
				{ value: 'l', label: t('labels.l') },
			],
		},
		{
			group: t('groups.culinary_measures'),
			options: [
				{ value: 'tsp', label: t('labels.tsp') },
				{ value: 'tbsp', label: t('labels.tbsp') },
				{ value: 'cup50', label: t('labels.cup50') },
				{ value: 'cup100', label: t('labels.cup100') },
				{ value: 'cup150', label: t('labels.cup150') },
				{ value: 'cup200', label: t('labels.cup200') },
				{ value: 'cup250', label: t('labels.cup250') },
			],
		},
		{
			group: t('groups.pieces'),
			options: [
				{ value: 'piece', label: t('labels.piece') },
				{ value: 'clove', label: t('labels.clove') },
				{ value: 'slice', label: t('labels.slice') },
				{ value: 'leaf', label: t('labels.leaf') },
			],
		},
		{
			group: t('groups.on_the_eye'),
			options: [
				{ value: 'pinch', label: t('labels.pinch') },
				{ value: 'handful', label: t('labels.handful') },
				{ value: 'bunch', label: t('labels.bunch') },
			],
		},
		{
			group: t('groups.package'),
			options: [
				{ value: 'pack', label: t('labels.pack') },
				{ value: 'can', label: t('labels.can') },
				{ value: 'bottle', label: t('labels.bottle') },
			],
		},
	];
};
