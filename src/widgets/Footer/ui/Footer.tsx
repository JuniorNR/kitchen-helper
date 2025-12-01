'use client';
import { useTheme } from 'next-themes';
import type { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { GithubIcon } from '@/shared/ui/icons/githubIcon';
import { TelegramIcon } from '@/shared/ui/icons/telegramIcon';
import type { FooterProps } from '../model/footer.types';
import { buildFooterGradient, detectSeason } from '../model/footer.utils';

export const Footer: FC<FooterProps> = ({ heightElement }) => {
	const { t: tCommon } = useTranslation('common');
	const { theme } = useTheme();
	const season = detectSeason(new Date());
	const gradient = buildFooterGradient(
		season,
		(theme as 'light' | 'dark') ?? 'light',
	);

	return (
		<footer
			className={
				'relative overflow-hidden text-foreground bg-background w-full'
			}
			style={{ minHeight: heightElement, background: gradient }}
		>
			<div className="max-w-7xl mx-auto px-5 py-4 flex flex-col md:flex-row items-center justify-between gap-3">
				<div className="text-xs opacity-80">
					© {new Date().getFullYear()} {tCommon('app_name')}
				</div>
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
			</div>
		</footer>
	);
};
