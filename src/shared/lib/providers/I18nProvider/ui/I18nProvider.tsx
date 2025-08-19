'use client';

import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { useEffect, useState } from 'react';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import commonEn from '@/shared/locales/en/common.json';
import commonRu from '@/shared/locales/ru/common.json';

const resources = {
	en: { common: commonEn },
	ru: { common: commonRu },
};

let isInitialized = false;

export const I18nProvider = ({ children }: { children: React.ReactNode }) => {
	const [ready, setReady] = useState(isInitialized);

	useEffect(() => {
		let cancelled = false;
		if (!isInitialized) {
			i18n
				.use(LanguageDetector)
				.use(initReactI18next)
				.init({
					resources,
					fallbackLng: 'en',
					supportedLngs: ['en', 'ru'],
					defaultNS: 'common',
					interpolation: { escapeValue: false },
					detection: {
						order: ['querystring', 'localStorage', 'navigator', 'cookie'],
						caches: ['localStorage'],
					},
				})
				.then(() => {
					if (!cancelled) {
						isInitialized = true;
						setReady(true);
					}
				})
				.catch(() => {
					if (!cancelled) {
						isInitialized = true;
						setReady(true);
					}
				});
		}
		return () => {
			cancelled = true;
		};
	}, []);

	if (!ready) return null;

	return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
};
