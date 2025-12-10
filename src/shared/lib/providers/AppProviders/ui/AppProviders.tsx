'use client';

import { ThemeProvider } from 'next-themes';
import { Provider as ReduxProvider } from 'react-redux';
import { store } from '@/shared/lib/store/store';
import { AlertProvider } from '../../AlertProvider';
import { EchoProvider } from '../../EchoProvider';
import { HeroUIProvider } from '../../HeroUIProvider';
import { I18nProvider } from '../../I18nProvider';

type Props = {
	children: React.ReactNode;
	forcedTheme?: 'light' | 'dark' | 'system';
};

export const AppProviders = ({ children, forcedTheme }: Props) => {
	return (
		<ReduxProvider store={store}>
			<I18nProvider>
				<HeroUIProvider>
					<ThemeProvider
						attribute="class"
						defaultTheme="dark"
						forcedTheme={forcedTheme}
					>
						<EchoProvider>
							<AlertProvider>{children}</AlertProvider>
						</EchoProvider>
					</ThemeProvider>
				</HeroUIProvider>
			</I18nProvider>
		</ReduxProvider>
	);
};
