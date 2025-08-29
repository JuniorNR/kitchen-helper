import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { layoutConfig } from '@/configs';
import { AuthBoundary } from '@/features';
import { AppProviders } from '@/shared/lib/providers/AppProviders';
import { store } from '@/shared/lib/store/store';
import { Header } from '@/widgets';

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
				className={`${geistSans.variable} ${geistMono.variable} antialiased text-foreground bg-background min-h-screen`}
			>
				<AppProviders>
					<Header height={layoutConfig.headerHeight} />
					<main
						className={'flex flex-col justify-start items-center'}
						style={{ height: layoutConfig.mainHeight }}
					>
						<AuthBoundary>{children}</AuthBoundary>
					</main>
					<footer style={{ height: layoutConfig.footerHeight }}>Footer</footer>
				</AppProviders>
			</body>
		</html>
	);
}
