'use client';

import { Divider } from '@heroui/divider';

export const RecipeItemSkeleton = () => {
	return (
		<div className="rounded-2xl border max-w-[300px] border-neutral-200 dark:border-neutral-800 bg-gradient-to-br from-white to-neutral-50/70 dark:from-neutral-900 dark:to-neutral-950 shadow-sm p-3 sm:p-4 animate-pulse">
			<div className="h-6 w-3/4 mx-auto rounded-md bg-neutral-200 dark:bg-neutral-800 mb-3" />
			<div className="relative w-full aspect-square overflow-hidden rounded-md bg-neutral-200 dark:bg-neutral-800" />
			<div className="mt-3 space-y-2">
				<div className="h-4 w-full rounded bg-neutral-200 dark:bg-neutral-800" />
				<div className="h-4 w-5/6 rounded bg-neutral-200 dark:bg-neutral-800" />
			</div>
			<Divider className="my-3" />
			<div className="space-y-1.5">
				<div className="h-4 w-2/5 rounded bg-neutral-200 dark:bg-neutral-800" />
				<div className="h-4 w-1/3 rounded bg-neutral-200 dark:bg-neutral-800" />
				<div className="h-4 w-1/2 rounded bg-neutral-200 dark:bg-neutral-800" />
				<div className="h-4 w-2/3 rounded bg-neutral-200 dark:bg-neutral-800" />
			</div>
			<Divider className="my-3" />
			<div className="space-y-1.5">
				<div className="h-4 w-1/2 rounded bg-neutral-200 dark:bg-neutral-800" />
				<div className="h-4 w-2/3 rounded bg-neutral-200 dark:bg-neutral-800" />
			</div>
			<Divider className="my-3" />
			<div className="h-10 w-full rounded-md bg-neutral-200 dark:bg-neutral-800" />
			<div className="mt-2 flex gap-2">
				<div className="h-10 w-full rounded-md bg-neutral-200 dark:bg-neutral-800" />
				<div className="h-10 w-10 rounded-md bg-neutral-200 dark:bg-neutral-800" />
			</div>
		</div>
	);
};
