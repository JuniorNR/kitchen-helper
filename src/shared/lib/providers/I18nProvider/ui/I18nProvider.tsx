'use client';

import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { useEffect, useState } from 'react';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import alertsEn from '@/shared/locales/en/alerts.json';
import commonEn from '@/shared/locales/en/common.json';
import fieldsEn from '@/shared/locales/en/fields.json';
import ingredientsEn from '@/shared/locales/en/ingredients.json';
import recipesEn from '@/shared/locales/en/recipes.json';
import unitsEn from '@/shared/locales/en/units.json';
import validationEn from '@/shared/locales/en/validation.json';
import alertsRu from '@/shared/locales/ru/alerts.json';
import commonRu from '@/shared/locales/ru/common.json';
import fieldsRu from '@/shared/locales/ru/fields.json';
import ingredientsRu from '@/shared/locales/ru/ingredients.json';
import recipesRu from '@/shared/locales/ru/recipes.json';
import unitsRu from '@/shared/locales/ru/units.json';
import validationRu from '@/shared/locales/ru/validation.json';

const resources = {
	en: {
		common: commonEn,
		fields: fieldsEn,
		ingredients: ingredientsEn,
		validation: validationEn,
		units: unitsEn,
		alerts: alertsEn,
		recipes: recipesEn,
	},
	ru: {
		common: commonRu,
		fields: fieldsRu,
		ingredients: ingredientsRu,
		validation: validationRu,
		units: unitsRu,
		alerts: alertsRu,
		recipes: recipesRu,
	},
};

let isInitialized = false;

export const I18nProvider = ({ children }: { children: React.ReactNode }) => {
	const [ready, setReady] = useState(isInitialized);

	useEffect(() => {
		let cancelled = false;
		const initOrUpdate = async () => {
			const options = {
				resources,
				fallbackLng: 'en',
				supportedLngs: ['en', 'ru'],
				defaultNS: 'common',
				ns: [
					'common',
					'fields',
					'validation',
					'units',
					'ingredients',
					'alerts',
					'recipes',
				],
				interpolation: { escapeValue: false },
				load: 'languageOnly' as const,
				lowerCaseLng: true,
				detection: {
					order: ['querystring', 'localStorage', 'navigator', 'cookie'],
					caches: ['localStorage'],
				},
			};

			try {
				if (!i18n.isInitialized) {
					await i18n.use(LanguageDetector).use(initReactI18next).init(options);
				} else {
					Object.entries(resources).forEach(([lng, nsMap]) => {
						Object.entries(nsMap as Record<string, unknown>).forEach(
							([ns, data]) => {
								if (i18n.hasResourceBundle(lng, ns)) {
									i18n.removeResourceBundle(lng, ns);
								}
								i18n.addResourceBundle(lng, ns, data, true, true);
							},
						);
					});
				}
				if (!cancelled) {
					isInitialized = true;
					setReady(true);
				}
			} catch {
				if (!cancelled) {
					isInitialized = true;
					setReady(true);
				}
			}
		};

		initOrUpdate();
		return () => {
			cancelled = true;
		};
	}, []);

	if (!ready) return null;

	return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
};
