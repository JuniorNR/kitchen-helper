'use client';

export const UserSettingsSkeleton = () => {
	return (
		<div className="w-full max-w-5xl mx-auto">
			<div className="mb-2">
				<div className="h-7 w-44 rounded bg-neutral-200 dark:bg-neutral-800" />
			</div>
			<div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-pulse">
				<div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-gradient-to-br from-white to-neutral-50/70 dark:from-neutral-900 dark:to-neutral-950 p-4">
					<div className="h-5 w-24 rounded bg-neutral-200 dark:bg-neutral-800" />
					<div className="my-3 h-px bg-neutral-200 dark:bg-neutral-800" />
					<div className="flex items-center gap-3">
						<div className="h-12 w-12 rounded-full bg-neutral-200 dark:bg-neutral-800" />
						<div className="flex-1 min-w-0">
							<div className="h-4 w-40 rounded bg-neutral-200 dark:bg-neutral-800 mb-2" />
							<div className="h-5 w-28 rounded bg-neutral-200 dark:bg-neutral-800" />
						</div>
					</div>
				</div>

				<div className="lg:col-span-2 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-gradient-to-br from-white to-neutral-50/70 dark:from-neutral-900 dark:to-neutral-950 p-4">
					<div className="h-5 w-24 rounded bg-neutral-200 dark:bg-neutral-800" />
					<div className="my-3 h-px bg-neutral-200 dark:bg-neutral-800" />
					<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
						<div className="h-12 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-100/60 dark:bg-neutral-900/40" />
						<div className="h-12 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-100/60 dark:bg-neutral-900/40" />
					</div>
					<div className="flex justify-end mt-4">
						<div className="h-10 w-28 rounded-lg bg-neutral-200 dark:bg-neutral-800" />
					</div>
				</div>

				<div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-gradient-to-br from-white to-neutral-50/70 dark:from-neutral-900 dark:to-neutral-950 p-4">
					<div className="h-5 w-28 rounded bg-neutral-200 dark:bg-neutral-800" />
					<div className="my-3 h-px bg-neutral-200 dark:bg-neutral-800" />
					<div className="flex flex-wrap gap-3">
						<div className="h-9 w-24 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-100/60 dark:bg-neutral-900/40" />
						<div className="h-9 w-20 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-100/60 dark:bg-neutral-900/40" />
					</div>
				</div>

				<div className="lg:col-span-2 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-gradient-to-br from-white to-neutral-50/70 dark:from-neutral-900 dark:to-neutral-950 p-4">
					<div className="h-5 w-28 rounded bg-neutral-200 dark:bg-neutral-800" />
					<div className="my-3 h-px bg-neutral-200 dark:bg-neutral-800" />
					<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
						<div className="h-12 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-100/60 dark:bg-neutral-900/40" />
						<div className="h-12 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-100/60 dark:bg-neutral-900/40" />
					</div>
				</div>
			</div>
		</div>
	);
};
