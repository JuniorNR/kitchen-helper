'use client';

import { ThemeProvider } from 'next-themes';
import { useRef } from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import { type AppStore, makeStore } from '@/shared/lib/store/store';
import { AlertProvider } from '../../AlertProvider';
import { EchoProvider } from '../../EchoProvider';
import { HeroUIProvider } from '../../HeroUIProvider';
import { I18nProvider } from '../../I18nProvider';
import type { AppProvidersProps } from '../model/appProviders.types';

export const AppProviders = ({ children, forcedTheme }: AppProvidersProps) => {
	const storeRef = useRef<AppStore | undefined>(undefined);
	if (!storeRef.current) {
		storeRef.current = makeStore();
	}

	return (
		<ReduxProvider store={storeRef.current}>
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
