'use client';

export const MarketSkeleton = () => {
	return (
		<div className="container mx-auto py-8 max-w-7xl animate-pulse">
			{/* Кнопка назад */}
			<div className="mb-6">
				<div className="h-10 w-20 rounded-lg bg-neutral-200 dark:bg-neutral-800" />
			</div>

			{/* Основной контент */}
			<div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8 items-stretch">
				{/* Изображения */}
				<div className="relative w-full">
					<div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-white/10 bg-neutral-200 dark:bg-neutral-800" />
				</div>

				{/* Информация о магазине */}
				<div className="flex flex-col gap-6 h-full">
					{/* Статистика */}
					<div className="grid grid-cols-3 gap-4">
						<div className="flex flex-col items-center justify-center p-4 rounded-xl border border-amber-400/40 bg-gradient-to-br from-amber-50/80 to-amber-100/50 dark:border-amber-300/30 dark:from-amber-900/30 dark:to-amber-800/20">
							<div className="flex items-center gap-2 mb-1">
								<div className="h-6 w-6 rounded bg-neutral-200 dark:bg-neutral-800" />
								<div className="h-8 w-14 rounded bg-neutral-200 dark:bg-neutral-800" />
							</div>
							<div className="h-3 w-20 rounded bg-neutral-200 dark:bg-neutral-800" />
						</div>
						<div className="flex flex-col items-center justify-center p-4 rounded-xl border border-sky-400/40 bg-gradient-to-br from-sky-50/80 to-sky-100/50 dark:border-sky-300/30 dark:from-sky-900/30 dark:to-sky-800/20">
							<div className="h-9 w-10 mb-1 rounded bg-neutral-200 dark:bg-neutral-800" />
							<div className="h-3 w-24 rounded bg-neutral-200 dark:bg-neutral-800" />
						</div>
						<div className="flex flex-col items-center justify-center p-4 rounded-xl border border-emerald-400/40 bg-gradient-to-br from-emerald-50/80 to-emerald-100/50 dark:border-emerald-300/30 dark:from-emerald-900/30 dark:to-emerald-800/20">
							<div className="h-3 w-28 mb-1 rounded bg-neutral-200 dark:bg-neutral-800" />
							<div className="h-9 w-20 rounded bg-neutral-200 dark:bg-neutral-800" />
						</div>
					</div>

					{/* Название и описание */}
					<div className="flex flex-col gap-4 p-6 rounded-2xl border border-white/10 bg-gradient-to-br from-content1/60 to-content2/40 shadow-lg h-full flex-1 justify-between">
						<div className="flex flex-col gap-4">
							{/* Заголовок */}
							<div className="h-14 w-5/6 rounded bg-neutral-200 dark:bg-neutral-800" />
							{/* Описание */}
							<div className="space-y-2.5">
								<div className="h-6 w-full rounded bg-neutral-200 dark:bg-neutral-800" />
								<div className="h-6 w-full rounded bg-neutral-200 dark:bg-neutral-800" />
								<div className="h-6 w-11/12 rounded bg-neutral-200 dark:bg-neutral-800" />
								<div className="h-6 w-10/12 rounded bg-neutral-200 dark:bg-neutral-800" />
							</div>
						</div>

						{/* Продавец */}
						<div className="flex items-center gap-3 p-4 rounded-xl border border-primary-200/30 bg-primary-50/50 dark:border-primary-500/20 dark:bg-primary-900/20 mt-auto">
							<div className="h-12 w-12 rounded-full bg-neutral-200 dark:bg-neutral-800" />
							<div className="flex flex-col gap-1.5">
								<div className="h-3 w-16 rounded bg-neutral-200 dark:bg-neutral-800" />
								<div className="h-5 w-28 rounded bg-neutral-200 dark:bg-neutral-800" />
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Табы */}
			<div className="mt-8">
				{/* Заголовки табов */}
				<div className="flex gap-6 mb-6">
					<div className="h-12 w-36 rounded-lg bg-neutral-200 dark:bg-neutral-800" />
					<div className="h-12 w-32 rounded-lg bg-neutral-200 dark:bg-neutral-800" />
				</div>

				{/* Контент таба */}
				<div className="space-y-8">
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
						{/* История магазина */}
						<div className="p-6 rounded-3xl border border-white/10 bg-gradient-to-br from-content1/60 via-content1/40 to-content2/40 backdrop-blur-sm shadow-xl">
							<div className="h-7 w-40 mb-4 rounded bg-neutral-200 dark:bg-neutral-800" />
							<div className="space-y-3">
								<div className="h-5 w-full rounded bg-neutral-200 dark:bg-neutral-800" />
								<div className="h-5 w-full rounded bg-neutral-200 dark:bg-neutral-800" />
								<div className="h-5 w-11/12 rounded bg-neutral-200 dark:bg-neutral-800" />
								<div className="h-5 w-10/12 rounded bg-neutral-200 dark:bg-neutral-800" />
								<div className="h-5 w-9/12 rounded bg-neutral-200 dark:bg-neutral-800" />
							</div>
						</div>

						{/* Темы */}
						<div className="p-6 rounded-3xl border border-white/10 bg-gradient-to-br from-content1/60 to-content2/40 shadow-xl">
							<div className="h-7 w-32 mb-4 rounded bg-neutral-200 dark:bg-neutral-800" />
							<div className="flex flex-wrap gap-3">
								<div className="h-9 w-28 rounded-full bg-neutral-200 dark:bg-neutral-800" />
								<div className="h-9 w-32 rounded-full bg-neutral-200 dark:bg-neutral-800" />
								<div className="h-9 w-24 rounded-full bg-neutral-200 dark:bg-neutral-800" />
								<div className="h-9 w-30 rounded-full bg-neutral-200 dark:bg-neutral-800" />
							</div>
						</div>
					</div>

					{/* Дополнительные блоки */}
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
						{/* О продавце */}
						<div className="p-6 rounded-3xl border border-white/10 bg-gradient-to-br from-content1/60 to-content2/40 shadow-xl">
							<div className="h-7 w-32 mb-4 rounded bg-neutral-200 dark:bg-neutral-800" />
							<div className="space-y-3">
								<div className="h-14 rounded-xl bg-neutral-200 dark:bg-neutral-800" />
								<div className="h-14 rounded-xl bg-neutral-200 dark:bg-neutral-800" />
								<div className="h-14 rounded-xl bg-neutral-200 dark:bg-neutral-800" />
								<div className="h-14 rounded-xl bg-neutral-200 dark:bg-neutral-800" />
							</div>
						</div>

						{/* Покупают чаще всего */}
						<div className="p-6 rounded-3xl border border-white/10 bg-gradient-to-br from-content1/60 to-content2/40 shadow-xl">
							<div className="h-7 w-40 mb-4 rounded bg-neutral-200 dark:bg-neutral-800" />
							<div className="space-y-3">
								<div className="h-12 rounded-xl bg-neutral-200 dark:bg-neutral-800" />
								<div className="h-12 rounded-xl bg-neutral-200 dark:bg-neutral-800" />
								<div className="h-12 rounded-xl bg-neutral-200 dark:bg-neutral-800" />
								<div className="h-12 rounded-xl bg-neutral-200 dark:bg-neutral-800" />
							</div>
						</div>
					</div>

					{/* Кнопки действий */}
					<div className="flex flex-col sm:flex-row gap-4">
						<div className="flex-1 h-12 rounded-lg bg-neutral-200 dark:bg-neutral-800" />
						<div className="flex-1 h-12 rounded-lg bg-neutral-200 dark:bg-neutral-800" />
					</div>
				</div>
			</div>
		</div>
	);
};
