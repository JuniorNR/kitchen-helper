'use client';

export const IngredientCardSkeleton = () => {
	return (
		<div className="flex flex-col relative rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-gradient-to-br from-white to-neutral-50/70 dark:from-neutral-900 dark:to-neutral-950 shadow-sm p-3 sm:p-4 animate-pulse">
			<div className="h-5 w-1/2 rounded bg-neutral-200 dark:bg-neutral-800 mb-2" />
			<div className="h-4 w-5/6 rounded bg-neutral-200 dark:bg-neutral-800" />
			<div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2">
				<div className="rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/60 dark:bg-neutral-900/40 px-3 py-2">
					<div className="h-3 w-16 rounded bg-neutral-200 dark:bg-neutral-800" />
					<div className="mt-2 h-4 w-24 rounded bg-neutral-200 dark:bg-neutral-800" />
				</div>
				<div className="rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/60 dark:bg-neutral-900/40 px-3 py-2">
					<div className="h-3 w-20 rounded bg-neutral-200 dark:bg-neutral-800" />
					<div className="mt-2 h-4 w-28 rounded bg-neutral-200 dark:bg-neutral-800" />
				</div>
				<div className="rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/60 dark:bg-neutral-900/40 px-3 py-2">
					<div className="h-3 w-20 rounded bg-neutral-200 dark:bg-neutral-800" />
					<div className="mt-2 h-4 w-24 rounded bg-neutral-200 dark:bg-neutral-800" />
				</div>
				<div className="rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/60 dark:bg-neutral-900/40 px-3 py-2">
					<div className="h-3 w-16 rounded bg-neutral-200 dark:bg-neutral-800" />
					<div className="mt-2 h-4 w-20 rounded bg-neutral-200 dark:bg-neutral-800" />
				</div>
			</div>
		</div>
	);
};
