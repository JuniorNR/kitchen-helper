'use client';

import { ThemeProvider } from 'next-themes';
import { Provider as ReduxProvider } from 'react-redux';
import { store } from '@/shared/lib/store/store';
import { HeroUIProvider } from '../../HeroUIProvider';
import { I18nProvider } from '../../I18nProvider';

type Props = {
	children: React.ReactNode;
};

export const AppProviders = ({ children }: Props) => {
	return (
		<ReduxProvider store={store}>
			<I18nProvider>
				<HeroUIProvider>
					<ThemeProvider attribute="class" defaultTheme="dark">
						{children}
					</ThemeProvider>
				</HeroUIProvider>
			</I18nProvider>
		</ReduxProvider>
	);
};
