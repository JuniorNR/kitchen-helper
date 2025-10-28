'use client';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import { type FC, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import type { Ingredient } from '@/entities';
import { DeleteButton, Typography } from '@/shared/ui';

export interface IngredientCardProps {
	ingredient: Ingredient;
	isDeleting?: boolean;
	onDelete?: (id: string) => void;
}

export const IngredientCard: FC<IngredientCardProps> = ({
	ingredient,
	isDeleting = false,
	onDelete,
}) => {
	const { t: tIngredients } = useTranslation('ingredients');
	const { t: tUnits } = useTranslation('units');
	const { t: tCommon, i18n } = useTranslation('common');

	const currencyFormatter = useMemo(() => {
		const map = (c: string) => {
			switch (c.toLowerCase()) {
				case 'usd':
					return 'USD';
				case 'eur':
					return 'EUR';
				default:
					return 'RUB';
			}
		};
		return new Intl.NumberFormat(i18n.language, {
			style: 'currency',
			currency: map(ingredient.currency),
			maximumFractionDigits: 0,
		});
	}, [i18n.language, ingredient.currency]);

	const variant = useMemo(() => {
		const key = ingredient.category.toLowerCase();
		if (
			key.startsWith('veg') ||
			key.startsWith('greens') ||
			key.startsWith('fruit')
		) {
			return {
				from: 'from-emerald-500/50',
				to: 'to-emerald-400/40',
				badgeBg: 'bg-emerald-600/90',
				badgeText: 'text-white',
				ring: 'focus-within:ring-emerald-500',
			};
		}
		if (key.startsWith('oil') || key.startsWith('fat')) {
			return {
				from: 'from-amber-500/50',
				to: 'to-amber-400/40',
				badgeBg: 'bg-amber-600/90',
				badgeText: 'text-white',
				ring: 'focus-within:ring-amber-500',
			};
		}
		if (
			key.startsWith('spice') ||
			key.startsWith('sauce') ||
			key.startsWith('vinegar') ||
			key.startsWith('acid')
		) {
			return {
				from: 'from-violet-500/50',
				to: 'to-violet-400/40',
				badgeBg: 'bg-violet-600/90',
				badgeText: 'text-white',
				ring: 'focus-within:ring-violet-500',
			};
		}
		if (
			key.startsWith('grain') ||
			key.startsWith('pasta') ||
			key.startsWith('noodles') ||
			key.startsWith('legume')
		) {
			return {
				from: 'from-yellow-500/50',
				to: 'to-yellow-400/40',
				badgeBg: 'bg-yellow-600/90',
				badgeText: 'text-black',
				ring: 'focus-within:ring-yellow-500',
			};
		}
		if (
			key.startsWith('meat') ||
			key.startsWith('beef') ||
			key.startsWith('pork') ||
			key.startsWith('lamb') ||
			key.startsWith('veal') ||
			key.startsWith('game')
		) {
			return {
				from: 'from-rose-500/50',
				to: 'to-rose-400/40',
				badgeBg: 'bg-rose-600/90',
				badgeText: 'text-white',
				ring: 'focus-within:ring-rose-500',
			};
		}
		if (key.startsWith('fish') || key.startsWith('seafood')) {
			return {
				from: 'from-cyan-500/50',
				to: 'to-cyan-400/40',
				badgeBg: 'bg-cyan-600/90',
				badgeText: 'text-white',
				ring: 'focus-within:ring-cyan-500',
			};
		}
		if (key.startsWith('mush')) {
			return {
				from: 'from-stone-500/50',
				to: 'to-stone-400/40',
				badgeBg: 'bg-stone-600/90',
				badgeText: 'text-white',
				ring: 'focus-within:ring-stone-500',
			};
		}
		return {
			from: 'from-neutral-500/40',
			to: 'to-neutral-400/30',
			badgeBg: 'bg-neutral-600/90',
			badgeText: 'text-white',
			ring: 'focus-within:ring-neutral-500',
		};
	}, [ingredient.category]);

	return (
		<div
			className={`flex flex-col sm:h-[280px] relative rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-gradient-to-br from-white to-neutral-50/70 dark:from-neutral-900 dark:to-neutral-950 shadow-sm hover:shadow-lg transition-all duration-200 p-3 sm:p-4 focus-within:ring-2 ${variant.ring} hover:-translate-y-0.5`}
		>
			<div className="absolute right-3 top-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-150">
				<DeleteButton
					ariaLabel={tCommon('delete')}
					size="sm"
					onPress={() => onDelete?.(ingredient.id)}
					isLoading={isDeleting}
				/>
			</div>

			<div className="flex items-start gap-3 pr-10 sm:pr-12">
				<div className="flex-1 min-w-0">
					<h3 className="text-lg font-bold truncate">{ingredient.title}</h3>
					<Typography className="mt-1 line-clamp-2" tooltip>
						{ingredient.description}
					</Typography>
				</div>
			</div>

			<div className="flex-grow-1 mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2">
				<div className="rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/60 dark:bg-neutral-900/40 px-3 py-2 overflow-hidden">
					<p className="text-xs text-neutral-500 dark:text-neutral-400">
						{tIngredients('table.price')}
					</p>
					<div className="mt-1 text-sm font-semibold">
						{currencyFormatter.format(Number(ingredient.price))}
					</div>
				</div>
				<div className="rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/60 dark:bg-neutral-900/40 px-3 py-2 overflow-hidden">
					<p className="text-xs text-neutral-500 dark:text-neutral-400">
						{tIngredients('table.createdAt')}
					</p>
					<div className="mt-1 text-sm">
						{(() => {
							const date = new Date(ingredient.createdAt);
							return Number.isNaN(date.getTime())
								? '-'
								: format(date, 'dd.MM.yyyy HH:mm', { locale: ru });
						})()}
					</div>
				</div>
				<div className="rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/60 dark:bg-neutral-900/40 px-3 py-2 overflow-hidden">
					<p className="text-xs text-neutral-500 dark:text-neutral-400">
						{tIngredients('table.category')}
					</p>
					<div className="mt-1 text-sm">
						{tIngredients(`labels.${ingredient.category}`)}
					</div>
				</div>
				<div className="rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/60 dark:bg-neutral-900/40 px-3 py-2 overflow-hidden">
					<p className="text-xs text-neutral-500 dark:text-neutral-400">
						{tIngredients('table.unit')}
					</p>
					<div className="mt-1 text-sm">
						{tUnits(`labels.${ingredient.unit}`)}
					</div>
				</div>
			</div>

			<div className="mt-3 flex justify-end sm:hidden">
				<DeleteButton
					ariaLabel={tCommon('delete')}
					label={tCommon('delete')}
					size="sm"
					onPress={() => onDelete?.(ingredient.id)}
					isLoading={isDeleting}
				/>
			</div>
		</div>
	);
};
