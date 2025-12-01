import { cutStringWithSeparator } from '../cutStringWithSeparator';

export const customizeString = (
	string: string,
	options: {
		language?: string;
		cut?: {
			english?: number;
			russian?: number;
			separator?: string;
		};
		ended?: {
			countTrigger: number;
			russian?: {
				zero?: string;
				one?: string;
				fromTwoToFour?: string;
				fromFiveToTen?: string;
				fromElevenToNineteen?: string;
			};
			english?: {
				moreThatOne?: string;
			};
		};
	},
) => {
	const { language = 'en', cut, ended } = options;
	const rawString = Object.entries(cut || {}).length
		? cutStringWithSeparator(
				string,
				(language === 'ru' ? cut?.russian : cut?.english) || 2,
				cut?.separator,
			)
		: string;

	if (language === 'ru') {
		if (
			ended?.countTrigger &&
			ended?.countTrigger >= 11 &&
			ended?.countTrigger <= 19
		) {
			return `${rawString}${ended?.russian?.fromElevenToNineteen || ''}`;
		}

		const countTriggerToString = String(ended?.countTrigger);

		if (/[0]$/.test(countTriggerToString)) {
			return `${rawString}${ended?.russian?.zero || ''}`;
		}
		if (/[1]$/.test(countTriggerToString)) {
			return `${rawString}${ended?.russian?.one || ''}`;
		}
		if (/[2-4]$/.test(countTriggerToString)) {
			return `${rawString}${ended?.russian?.fromTwoToFour || ''}`;
		}
		if (/[5-9]$/.test(countTriggerToString)) {
			return `${rawString}${ended?.russian?.fromFiveToTen || ''}`;
		}
	}

	if (ended?.countTrigger && ended?.countTrigger > 1) {
		return `${rawString}'${ended?.english?.moreThatOne || 's'}`;
	}

	return rawString;
};
