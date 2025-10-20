'use client';

import { useTranslation } from 'react-i18next';

export default function SettingsLoading() {
	const { t: tCommon } = useTranslation('common');
	return (
		<div className="px-4 md:px-8 py-6">
			<div className="max-w-5xl mx-auto">
				<div className="mb-6">
					<h1 className="text-2xl font-bold">
						{tCommon('page_titles.user_settings')}
					</h1>
				</div>
				<div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-pulse">
					<div className="space-y-6">
						<div className="h-36 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-gradient-to-br from-white to-neutral-50/70 dark:from-neutral-900 dark:to-neutral-950" />
						<div className="h-28 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-gradient-to-br from-white to-neutral-50/70 dark:from-neutral-900 dark:to-neutral-950" />
					</div>
					<div className="lg:col-span-2">
						<div className="h-64 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-gradient-to-br from-white to-neutral-50/70 dark:from-neutral-900 dark:to-neutral-950" />
					</div>
				</div>
			</div>
		</div>
	);
}
