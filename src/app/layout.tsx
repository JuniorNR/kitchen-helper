import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from 'next-themes';
import { HeroUIProvider, I18nProvider } from '@/shared';
import { Header } from '@/widgets';
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

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased text-foreground bg-background min-h-screen`}
			>
				<I18nProvider>
					<HeroUIProvider>
						<ThemeProvider attribute="class" defaultTheme="dark">
							<Header />
							<div className={styles.page}>{children}</div>
						</ThemeProvider>
					</HeroUIProvider>
				</I18nProvider>
			</body>
		</html>
	);
}
