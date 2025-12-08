'use client';

export const MarketCardSkeleton = () => {
	return (
		<article className="flex h-full flex-col gap-5 rounded-3xl border border-white/5 bg-content1/40 p-6 shadow-lg shadow-black/5 dark:bg-content2/30 dark:backdrop-blur animate-pulse">
			{/* Изображение */}
			<div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-white/10 bg-neutral-200 dark:bg-neutral-800" />

			{/* Заголовок и рейтинг */}
			<div className="flex flex-col gap-3">
				<div className="flex flex-wrap items-start justify-between gap-3">
					<div className="flex-1 space-y-2">
						<div className="h-6 w-3/4 rounded bg-neutral-200 dark:bg-neutral-800" />
						<div className="h-4 w-1/2 rounded bg-neutral-200 dark:bg-neutral-800" />
						<div className="h-4 w-1/3 rounded bg-neutral-200 dark:bg-neutral-800" />
					</div>
					<div className="flex items-center gap-2">
						<div className="h-8 w-16 rounded-full bg-neutral-200 dark:bg-neutral-800" />
						<div className="h-8 w-20 rounded-full bg-neutral-200 dark:bg-neutral-800" />
					</div>
				</div>
				{/* Описание */}
				<div className="space-y-2">
					<div className="h-4 w-full rounded bg-neutral-200 dark:bg-neutral-800" />
					<div className="h-4 w-5/6 rounded bg-neutral-200 dark:bg-neutral-800" />
					<div className="h-4 w-4/6 rounded bg-neutral-200 dark:bg-neutral-800" />
				</div>
			</div>

			{/* Тематики витрины */}
			<div className="py-2 px-4 rounded-2xl border border-foreground-100/50 bg-gradient-to-r from-white/70 via-white/40 to-white/20 dark:border-white/10 dark:from-slate-900/70 dark:via-slate-900/40 dark:to-slate-900/20">
				<div className="h-4 w-32 mb-3 rounded bg-neutral-200 dark:bg-neutral-800" />
				<div className="flex gap-2 flex-wrap">
					<div className="h-6 w-20 rounded-full bg-neutral-200 dark:bg-neutral-800" />
					<div className="h-6 w-24 rounded-full bg-neutral-200 dark:bg-neutral-800" />
					<div className="h-6 w-16 rounded-full bg-neutral-200 dark:bg-neutral-800" />
					<div className="h-6 w-28 rounded-full bg-neutral-200 dark:bg-neutral-800" />
				</div>
			</div>

			{/* Статистика и список */}
			<div className="grid gap-4 flex-grow-1 rounded-3xl border border-white/5 bg-white/40 p-4 shadow-inner dark:border-white/10 dark:bg-slate-900/40">
				<div className="grid gap-4 sm:grid-cols-2">
					{/* Кол-во рецептов */}
					<div className="flex flex-col items-center justify-center rounded-2xl border border-foreground-100/40 bg-white/70 p-2 dark:border-white/10 dark:bg-white/5">
						<div className="h-4 w-24 mb-2 rounded bg-neutral-200 dark:bg-neutral-800" />
						<div className="h-8 w-12 rounded bg-neutral-200 dark:bg-neutral-800" />
					</div>
					{/* Средний чек */}
					<div className="flex flex-col items-center justify-center rounded-2xl border border-foreground-100/40 bg-white/70 p-2 dark:border-white/10 dark:bg-white/5">
						<div className="h-4 w-20 mb-2 rounded bg-neutral-200 dark:bg-neutral-800" />
						<div className="h-8 w-16 rounded bg-neutral-200 dark:bg-neutral-800" />
					</div>
				</div>

				{/* Покупают чаще всего */}
				<div className="rounded-2xl border border-foreground-100/40 bg-white/90 p-4 shadow-inner dark:border-white/20 dark:bg-white/10">
					<div className="h-3 w-40 mb-3 rounded bg-neutral-200 dark:bg-neutral-800" />
					<ul className="mt-3 space-y-2">
						<li className="h-4 w-full rounded bg-neutral-200 dark:bg-neutral-800" />
						<li className="h-4 w-5/6 rounded bg-neutral-200 dark:bg-neutral-800" />
						<li className="h-4 w-4/6 rounded bg-neutral-200 dark:bg-neutral-800" />
					</ul>
				</div>
			</div>
		</article>
	);
};
