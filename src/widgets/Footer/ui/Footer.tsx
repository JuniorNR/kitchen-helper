'use client';

import Link from 'next/link';
import { useTheme } from 'next-themes';
import type { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { GithubIcon } from '@/shared/ui/icons/githubIcon';
import { TelegramIcon } from '@/shared/ui/icons/telegramIcon';
import type { FooterProps } from '../model/footer.types';
import {
	buildFooterGradient,
	detectSeason,
	seasonToWaveFill,
} from '../model/footer.utils';
import { WaveTop } from './icons/WaveTop';

export const Footer: FC<FooterProps> = ({ heightElement }) => {
	const { t: tCommon } = useTranslation('common');
	const { theme } = useTheme();
	const season = detectSeason(new Date());
	const gradient = buildFooterGradient(
		season,
		(theme as 'light' | 'dark') ?? 'light',
	);
	const waveFill = seasonToWaveFill[season];

	return (
		<footer
			className={
				'relative overflow-hidden text-foreground bg-background w-full'
			}
			style={{ minHeight: heightElement, background: gradient }}
		>
			<div
				aria-hidden="true"
				className="absolute left-0 right-0 -top-1 h-10 pointer-events-none"
			>
				<WaveTop style={{ color: waveFill }} />
			</div>
			<div className="max-w-7xl mx-auto px-5 py-10">
				<div className="grid grid-cols-1 md:grid-cols-4 gap-8">
					<div>
						<div className="font-semibold text-lg">{tCommon('app_name')}</div>
						<p className="mt-2 text-sm opacity-80">
							{tCommon('app_name_description')}
						</p>
					</div>

					<nav aria-label={tCommon('quick_links')}>
						<div className="font-medium mb-2">
							{tCommon('footer.navigation')}
						</div>
						<ul className="space-y-2 text-sm">
							<li>
								<Link className="hover:underline" href="/market">
									{tCommon('header.market')}
								</Link>
							</li>
							<li>
								<Link className="hover:underline" href="/recipes">
									{tCommon('header.recipes')}
								</Link>
							</li>
							<li>
								<Link className="hover:underline" href="/ingredients">
									{tCommon('header.ingredients')}
								</Link>
							</li>
							<li>
								<Link className="hover:underline" href="/settings">
									{tCommon('header.settings')}
								</Link>
							</li>
						</ul>
					</nav>

					<div>
						<div className="font-medium mb-2">
							{tCommon('footer.categories')}
						</div>
						<div className="flex flex-wrap gap-2">
							{['test1', 'test2', 'test3'].map((tag) => (
								<span
									key={tag}
									className="text-xs px-2 py-1 rounded-full border border-foreground/20"
								>
									{tag}
								</span>
							))}
						</div>
					</div>

					<div>
						<div className="font-medium mb-2">
							{tCommon('footer.subscription')}
						</div>
						<form
							className="flex gap-2"
							action="#"
							onSubmit={(e) => e.preventDefault()}
						>
							<input
								type="email"
								placeholder={tCommon('footer.your_email')}
								className="w-full rounded-md px-3 py-2 bg-background/60 border border-foreground/20"
								aria-label={tCommon('enter_email_for_subscription')}
							/>
							<button
								type="submit"
								className="rounded-md px-4 py-2 bg-foreground text-background text-sm"
							>
								{tCommon('footer.subscribe')}
							</button>
						</form>
						<p className="mt-2 text-xs opacity-75">
							{tCommon('footer.get_updates_about_new_recipes')}
						</p>
					</div>
				</div>
			</div>

			<div className="border-t border-foreground/10">
				<div className="max-w-7xl mx-auto px-5 py-4 flex flex-col md:flex-row items-center justify-between gap-3">
					<div className="text-xs opacity-80">
						© {new Date().getFullYear()} {tCommon('app_name')}
					</div>
					<div className="flex items-center gap-3">
						<div className="flex items-center gap-2">
							<a
								href="https://github.com"
								target="_blank"
								rel="noreferrer"
								aria-label={tCommon('github')}
								className="opacity-80 hover:opacity-100"
							>
								<GithubIcon />
								<span className="sr-only">{tCommon('github')}</span>
							</a>
							<a
								href="https://t.me/brotherFromAnotherMother52"
								target="_blank"
								rel="noreferrer"
								aria-label={tCommon('telegram')}
								className="opacity-80 hover:opacity-100"
							>
								<TelegramIcon />
								<span className="sr-only">{tCommon('telegram')}</span>
							</a>
						</div>

						<button
							type="button"
							className="ml-2 text-xs underline opacity-90 hover:opacity-100"
							onClick={() => {
								if (typeof window !== 'undefined') {
									window.scrollTo({ top: 0, behavior: 'smooth' });
								}
							}}
						>
							{tCommon('footer.back_to_top')}
						</button>
					</div>
				</div>
			</div>
		</footer>
	);
};
