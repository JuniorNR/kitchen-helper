import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { layoutConfig } from '@/configs';
import { AuthBoundary } from '@/features';
import { classNames } from '@/shared/lib/helpers';
import { AppProviders } from '@/shared/lib/providers/AppProviders';
import { Footer, Header } from '@/widgets';
import styles from './layout.module.scss';

const geistSans = Geist({
	variable: '--font-geist-sans',
	subsets: ['latin'],
});

const geistMono = Geist_Mono({
	variable: '--font-geist-mono',
	subsets: ['latin'],
});

export const metadata: Metadata = {
	title: 'Kitchen helper',
	description:
		'An assistant in the kitchen, helps to write down recipes for dishes',
};

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body
				className={classNames(
					`${geistSans.variable} ${geistMono.variable} antialiased text-foreground bg-background min-h-screen`,
					{},
					[styles.layout],
				)}
			>
				<AppProviders>
					<div className="flex flex-col justify-between min-h-screen">
						<Header height={layoutConfig.headerHeight} />
						<main
							className={classNames(
								`flex flex-col justify-between items-center w-full p-5`,
							)}
						>
							<AuthBoundary>{children}</AuthBoundary>
						</main>
						<Footer heightElement={layoutConfig.footerHeight} />
					</div>
				</AppProviders>
			</body>
		</html>
	);
}
