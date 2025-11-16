import { Button } from '@heroui/button';
import moment from 'moment';
import { type FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import type { IngredientListFilter } from '@/features/IngredientsList/model/ingredientsList.types';
import { prepareCase } from '@/shared/lib/helpers';
import { PlusIcon } from '../../icons/plusIcon';
import type { FilterProps } from '../model/filter.types';
import { FilterBadge } from './FilterBadge';
import { FilterForm } from './FilterForm';

export const Filter: FC<FilterProps> = ({
	children,
	badges,
	filterFromLocalStorage,
	onSubmit,
	onReset,
	onSave,
	onCancel,
	onDeleteBadge,
	saveDisabled,
	submitDisabled,
}) => {
	const { t: tFields } = useTranslation('fields');
	const { t: tIngredients } = useTranslation('ingredients');
	const { t: tUnits } = useTranslation('units');
	const { t: tRecipes } = useTranslation('recipes');
	const [isOpen, setIsOpen] = useState<boolean>(false);

	type BadgeTuple = [
		string,
		string | number | Date | string[] | number[],
		{ inPreset: boolean },
	];

	const prepareBadges = (badges: FilterProps['badges']): BadgeTuple[] => {
		const badgesEntries: BadgeTuple[] = Object.entries(badges).map(
			([key, value]) => {
				const presetKey = prepareCase(
					String(key),
					'camel',
				) as keyof IngredientListFilter;
				let inPreset: boolean = false;

				// helper: compare arrays ignoring order (for primitives)
				const arraysEqualUnordered = <T extends string | number>(
					a?: T[],
					b?: T[],
				): boolean => {
					if (!a && !b) return true;
					if (!a || !b) return false;
					if (a.length !== b.length) return false;
					const freq = new Map<T, number>();
					for (const v of a) freq.set(v, (freq.get(v) ?? 0) + 1);
					for (const v of b) {
						const n = freq.get(v);
						if (!n) return false;
						n === 1 ? freq.delete(v) : freq.set(v, n - 1);
					}
					return freq.size === 0;
				};

				if (
					key === 'createdFrom' ||
					key === 'createdTo' ||
					key === 'createdAt'
				) {
					const preparedDate =
						typeof value === 'string'
							? value
							: value instanceof Date
								? moment(value).format('DD.MM.YYYY')
								: '';
					inPreset = filterFromLocalStorage[presetKey] === preparedDate;
					return [
						prepareCase(key, 'snake'),
						preparedDate,
						{ inPreset },
					] as BadgeTuple;
				}

				if (
					Array.isArray(value) &&
					Array.isArray(filterFromLocalStorage[presetKey])
				) {
					inPreset = arraysEqualUnordered(
						value as (string | number)[],
						filterFromLocalStorage[presetKey] as (string | number)[],
					);
					return [prepareCase(key, 'snake'), value, { inPreset }] as BadgeTuple;
				}

				inPreset = filterFromLocalStorage[presetKey] === value;
				return [prepareCase(key, 'snake'), value, { inPreset }] as BadgeTuple;
			},
		);
		return badgesEntries.filter((item) => item[1] !== undefined);
	};

	const onHandleDeleteBadge = (
		badge: (string | number | Date | string[] | number[])[],
	) => {
		const key = prepareCase(String(badge[0]));
		const value = badge[1];
		onDeleteBadge(key, value);
	};

	const renderBadges = () => {
		const preparedBadges = prepareBadges(badges);
		return preparedBadges.map((badge) => {
			const { inPreset } = badge[2];
			if (typeof badge[0] === 'string' && !Array.isArray(badge[1])) {
				return (
					<FilterBadge
						key={badge[0]}
						readOnly={inPreset}
						onDelete={() =>
							onHandleDeleteBadge([badge[0], badge[1]] as (
								| string
								| number
								| Date
								| string[]
								| number[]
							)[])
						}
					>{`${tFields(badge[0])}: ${badge[1]}`}</FilterBadge>
				);
			}
			if (typeof badge[0] === 'string' && Array.isArray(badge[1])) {
				const label = tFields(badge[0]);
				const preparedValue = (
					badgeItem: string | number | Date | string[] | number[],
				): string => {
					if (badge[0] === 'categories') {
						return tIngredients(`labels.${badgeItem}`);
					}
					if (badge[0] === 'units') {
						return tUnits(`labels.${badgeItem}`);
					}
					if (badge[0] === 'type') {
						return tRecipes(`labels.${badgeItem}`);
					}
					if (badge[0] === 'ration') {
						return tIngredients(`rations.${badgeItem}`);
					}
					return String(badgeItem);
				};
				return (
					<div
						key={`${badge[0]}-group`}
						className="inline-flex items-center gap-1.5 rounded-full border border-gray-200 bg-white/60 px-2 py-1.5 shadow-sm ring-1 ring-gray-200/60 dark:border-white/10 dark:bg-white/5 dark:ring-white/10"
					>
						<span className="text-xs text-gray-600 dark:text-gray-300 mr-0.5">
							{label}:
						</span>
						{badge[1].map((badgeItem) => (
							<FilterBadge
								key={badgeItem}
								withoutDeleteButton
								readOnly={inPreset}
								compact
								className="text-xs !px-1 !py-0.5"
							>
								{preparedValue(badgeItem)}
							</FilterBadge>
						))}
						{!inPreset && (
							<button
								type="button"
								aria-label="Delete group"
								onClick={() =>
									onHandleDeleteBadge([badge[0], badge[1]] as (
										| string
										| number
										| Date
										| string[]
										| number[]
									)[])
								}
								className="inline-flex h-4 w-4 items-center justify-center rounded-full text-gray-500 transition-all duration-150 hover:bg-gray-200 hover:text-gray-700 focus:outline-none focus:ring-1 focus:ring-gray-300 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-gray-100 dark:focus:ring-gray-600 cursor-pointer"
							>
								<span aria-hidden="true" className="leading-none text-sm">
									×
								</span>
							</button>
						)}
					</div>
				);
			}

			if (badge[0] === 'units' && Array.isArray(badge[1])) {
				return (
					<div
						key={`${badge[0]}-group`}
						className="inline-flex items-center gap-1.5 rounded-full border border-gray-200 bg-white/60 px-2 py-1.5 shadow-sm ring-1 ring-gray-200/60 dark:border-white/10 dark:bg-white/5 dark:ring-white/10"
					>
						<span className="text-xs text-gray-600 dark:text-gray-300 mr-0.5">
							{tFields('units')}:
						</span>
						{badge[1].map((badgeItem) => (
							<FilterBadge
								key={badgeItem}
								readOnly={inPreset}
								withoutDeleteButton
								compact
								className="text-xs !px-1 !py-0.5"
							>
								{tUnits(`labels.${badgeItem}`)}
							</FilterBadge>
						))}
						{!inPreset && (
							<button
								type="button"
								aria-label="Delete group"
								onClick={() =>
									onHandleDeleteBadge([badge[0], badge[1]] as (
										| string
										| number
										| Date
										| string[]
										| number[]
									)[])
								}
								className="inline-flex h-4 w-4 items-center justify-center rounded-full text-gray-500 transition-all duration-150 hover:bg-gray-200 hover:text-gray-700 focus:outline-none focus:ring-1 focus:ring-gray-300 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-gray-100 dark:focus:ring-gray-600 cursor-pointer"
							>
								<span aria-hidden="true" className="leading-none text-sm">
									×
								</span>
							</button>
						)}
					</div>
				);
			}
			return (
				<FilterBadge
					key={String(badge[0])}
					className={`${inPreset ? 'text-red-600 dark:text-red-600' : ''}`}
					onDelete={() =>
						onHandleDeleteBadge([badge[0], badge[1]] as (
							| string
							| number
							| Date
							| string[]
							| number[]
						)[])
					}
				>
					{`${tFields(String(badge[0]))}: ${badge[1]}`}
				</FilterBadge>
			);
		});
	};

	return (
		<div>
			<div className="flex flex-wrap items-center gap-2 mb-3">
				<Button
					type="button"
					aria-label="Add tag"
					onPress={() => setIsOpen((prev) => !prev)}
					isIconOnly
					className="group inline-flex items-center justify-center rounded-full border border-gray-300 bg-gray-100 h-[34px] w-[34px] min-h-[34px] min-w-[34px] aspect-square p-0 text-sm font-medium text-gray-800 transition-all duration-150 ease-out hover:border-gray-400 hover:bg-gray-200 hover:shadow-sm hover:ring-2 hover:ring-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 dark:hover:border-gray-600 dark:hover:bg-gray-700 dark:hover:ring-gray-600 cursor-pointer"
				>
					<PlusIcon
						className={`transition-transform duration-200 ease-out ${isOpen ? 'rotate-135 group-hover:rotate-235' : 'group-hover:rotate-90'}`}
						width={16}
						height={16}
						aria-hidden="true"
					/>
				</Button>
				{renderBadges()}
			</div>
			<FilterForm
				isOpen={isOpen}
				onSubmit={onSubmit}
				onSave={onSave}
				onReset={onReset}
				onCancel={onCancel}
				saveDisabled={saveDisabled}
				submitDisabled={submitDisabled}
			>
				{children}
			</FilterForm>
		</div>
	);
};
