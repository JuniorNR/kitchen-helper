import type { Meta, StoryObj } from '@storybook/react';
import { useId, useState } from 'react';
import { customizeString } from './customizeString';

const meta = {
	title: 'Shared/Lib/Helpers/customizeString',
	tags: ['autodocs'],
	parameters: {
		layout: 'padded',
		docs: {
			description: {
				component:
					'Хелпер `customizeString` используется для кастомизации строк: обрезки текста с учетом языка и добавления окончаний в зависимости от числа. Поддерживает русский и английский языки.',
			},
		},
	},
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Интерактивный пример использования customizeString.
 */
export const InteractiveExample: Story = {
	name: 'Интерактивный пример',
	parameters: {
		docs: {
			description: {
				story:
					'Интерактивный пример, демонстрирующий все возможности функции `customizeString`. Изменяйте параметры ниже, чтобы увидеть, как меняется результат.',
			},
		},
	},
	render: () => {
		const stringId = useId();
		const languageId = useId();
		const cutEnglishId = useId();
		const cutRussianId = useId();
		const separatorId = useId();
		const countTriggerId = useId();
		const zeroId = useId();
		const oneId = useId();
		const fromTwoToFourId = useId();
		const fromFiveToTenId = useId();
		const fromElevenToNineteenId = useId();
		const englishMoreThanOneId = useId();
		const enableCutId = useId();
		const enableEndedId = useId();

		const [string, setString] = useState('рецепт');
		const [language, setLanguage] = useState<'ru' | 'en'>('ru');
		const [cutEnglish, setCutEnglish] = useState('5');
		const [cutRussian, setCutRussian] = useState('5');
		const [separator, setSeparator] = useState('..');
		const [enableCut, setEnableCut] = useState(false);
		const [countTrigger, setCountTrigger] = useState('1');
		const [enableEnded, setEnableEnded] = useState(true);
		const [zero, setZero] = useState('ов');
		const [one, setOne] = useState('');
		const [fromTwoToFour, setFromTwoToFour] = useState('а');
		const [fromFiveToTen, setFromFiveToTen] = useState('ов');
		const [fromElevenToNineteen, setFromElevenToNineteen] = useState('ов');
		const [englishMoreThanOne, setEnglishMoreThanOne] = useState('s');

		const cutEnglishNum = cutEnglish ? parseInt(cutEnglish, 10) : undefined;
		const cutRussianNum = cutRussian ? parseInt(cutRussian, 10) : undefined;
		const countTriggerNum = countTrigger
			? parseInt(countTrigger, 10)
			: undefined;

		const result = customizeString(string, {
			language,
			cut: enableCut
				? {
						english: cutEnglishNum,
						russian: cutRussianNum,
						separator: separator || undefined,
					}
				: undefined,
			ended:
				enableEnded && countTriggerNum !== undefined
					? {
							countTrigger: countTriggerNum,
							russian: {
								zero: zero || undefined,
								one: one || undefined,
								fromTwoToFour: fromTwoToFour || undefined,
								fromFiveToTen: fromFiveToTen || undefined,
								fromElevenToNineteen: fromElevenToNineteen || undefined,
							},
							english: {
								moreThatOne: englishMoreThanOne || undefined,
							},
						}
					: undefined,
		});

		const optionsCode = `{
  language: '${language}',
  ${
		enableCut
			? `cut: {
    english: ${cutEnglishNum ?? 'undefined'},
    russian: ${cutRussianNum ?? 'undefined'},
    separator: '${separator}',
  },`
			: ''
	}
  ${
		enableEnded && countTriggerNum !== undefined
			? `ended: {
    countTrigger: ${countTriggerNum},
    ${
			language === 'ru'
				? `russian: {
      zero: '${zero}',
      one: '${one}',
      fromTwoToFour: '${fromTwoToFour}',
      fromFiveToTen: '${fromFiveToTen}',
      fromElevenToNineteen: '${fromElevenToNineteen}',
    },`
				: ''
		}
    ${
			language === 'en'
				? `english: {
      moreThatOne: '${englishMoreThanOne}',
    },`
				: ''
		}
  },`
			: ''
	}
}`;

		return (
			<div className="space-y-4">
				<div className="grid grid-cols-2 gap-4">
					<div className="grid grid-cols-2 gap-4 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg border border-gray-300 dark:border-gray-700">
						<div>
							<label
								htmlFor={stringId}
								className="block text-sm font-medium mb-1 text-gray-800 dark:text-gray-200"
							>
								Исходная строка:
							</label>
							<input
								id={stringId}
								type="text"
								value={string}
								onChange={(e) => setString(e.target.value)}
								className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded dark:bg-gray-700 text-gray-900 dark:text-gray-100"
								placeholder="Введите строку"
							/>
						</div>
						<div>
							<label
								htmlFor={languageId}
								className="block text-sm font-medium mb-1 text-gray-800 dark:text-gray-200"
							>
								Язык:
							</label>
							<select
								id={languageId}
								value={language}
								onChange={(e) => setLanguage(e.target.value as 'ru' | 'en')}
								className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded dark:bg-gray-700 text-gray-900 dark:text-gray-100"
							>
								<option value="ru">Русский</option>
								<option value="en">Английский</option>
							</select>
						</div>
						<div className="md:col-span-2 flex items-center gap-2">
							<input
								type="checkbox"
								id={enableCutId}
								checked={enableCut}
								onChange={(e) => setEnableCut(e.target.checked)}
								className="w-4 h-4"
							/>
							<label
								htmlFor={enableCutId}
								className="text-sm font-medium text-gray-800 dark:text-gray-200"
							>
								Включить обрезку строки
							</label>
						</div>
						{enableCut && (
							<>
								<div>
									<label
										htmlFor={cutEnglishId}
										className="block text-sm font-medium mb-1 text-gray-800 dark:text-gray-200"
									>
										Обрезка (английский, символов):
									</label>
									<input
										id={cutEnglishId}
										type="number"
										value={cutEnglish}
										onChange={(e) => setCutEnglish(e.target.value)}
										className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded dark:bg-gray-700 text-gray-900 dark:text-gray-100"
										min="1"
									/>
								</div>
								<div>
									<label
										htmlFor={cutRussianId}
										className="block text-sm font-medium mb-1 text-gray-800 dark:text-gray-200"
									>
										Обрезка (русский, символов):
									</label>
									<input
										id={cutRussianId}
										type="number"
										value={cutRussian}
										onChange={(e) => setCutRussian(e.target.value)}
										className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded dark:bg-gray-700 text-gray-900 dark:text-gray-100"
										min="1"
									/>
								</div>
								<div className="md:col-span-2">
									<label
										htmlFor={separatorId}
										className="block text-sm font-medium mb-1 text-gray-800 dark:text-gray-200"
									>
										Разделитель:
									</label>
									<input
										id={separatorId}
										type="text"
										value={separator}
										onChange={(e) => setSeparator(e.target.value)}
										className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded dark:bg-gray-700 text-gray-900 dark:text-gray-100"
										placeholder=".."
									/>
								</div>
							</>
						)}
						<div className="md:col-span-2 flex items-center gap-2">
							<input
								type="checkbox"
								id={enableEndedId}
								checked={enableEnded}
								onChange={(e) => setEnableEnded(e.target.checked)}
								className="w-4 h-4"
							/>
							<label
								htmlFor={enableEndedId}
								className="text-sm font-medium text-gray-800 dark:text-gray-200"
							>
								Включить окончания
							</label>
						</div>
						{enableEnded && (
							<>
								<div className="md:col-span-2">
									<label
										htmlFor={countTriggerId}
										className="block text-sm font-medium mb-1 text-gray-800 dark:text-gray-200"
									>
										Число (countTrigger):
									</label>
									<input
										id={countTriggerId}
										type="number"
										value={countTrigger}
										onChange={(e) => setCountTrigger(e.target.value)}
										className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded dark:bg-gray-700 text-gray-900 dark:text-gray-100"
										min="0"
									/>
								</div>

								{language === 'ru' && (
									<>
										<div>
											<label
												htmlFor={zeroId}
												className="block text-sm font-medium mb-1 text-gray-800 dark:text-gray-200"
											>
												0, 10, 20... (zero):
											</label>
											<input
												id={zeroId}
												type="text"
												value={zero}
												onChange={(e) => setZero(e.target.value)}
												className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded dark:bg-gray-700 text-gray-900 dark:text-gray-100"
											/>
										</div>
										<div>
											<label
												htmlFor={oneId}
												className="block text-sm font-medium mb-1 text-gray-800 dark:text-gray-200"
											>
												1, 21, 31... (one):
											</label>
											<input
												id={oneId}
												type="text"
												value={one}
												onChange={(e) => setOne(e.target.value)}
												className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded dark:bg-gray-700 text-gray-900 dark:text-gray-100"
											/>
										</div>
										<div>
											<label
												htmlFor={fromTwoToFourId}
												className="block text-sm font-medium mb-1 text-gray-800 dark:text-gray-200"
											>
												2-4, 22-24... (fromTwoToFour):
											</label>
											<input
												id={fromTwoToFourId}
												type="text"
												value={fromTwoToFour}
												onChange={(e) => setFromTwoToFour(e.target.value)}
												className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded dark:bg-gray-700 text-gray-900 dark:text-gray-100"
											/>
										</div>
										<div>
											<label
												htmlFor={fromFiveToTenId}
												className="block text-sm font-medium mb-1 text-gray-800 dark:text-gray-200"
											>
												5-9, 25-29... (fromFiveToTen):
											</label>
											<input
												id={fromFiveToTenId}
												type="text"
												value={fromFiveToTen}
												onChange={(e) => setFromFiveToTen(e.target.value)}
												className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded dark:bg-gray-700 text-gray-900 dark:text-gray-100"
											/>
										</div>
										<div>
											<label
												htmlFor={fromElevenToNineteenId}
												className="block text-sm font-medium mb-1 text-gray-800 dark:text-gray-200"
											>
												11-19 (fromElevenToNineteen):
											</label>
											<input
												id={fromElevenToNineteenId}
												type="text"
												value={fromElevenToNineteen}
												onChange={(e) =>
													setFromElevenToNineteen(e.target.value)
												}
												className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded dark:bg-gray-700 text-gray-900 dark:text-gray-100"
											/>
										</div>
									</>
								)}

								{language === 'en' && (
									<div className="md:col-span-2">
										<label
											htmlFor={englishMoreThanOneId}
											className="block text-sm font-medium mb-1 text-gray-800 dark:text-gray-200"
										>
											Больше 1 (moreThatOne):
										</label>
										<input
											id={englishMoreThanOneId}
											type="text"
											value={englishMoreThanOne}
											onChange={(e) => setEnglishMoreThanOne(e.target.value)}
											className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded dark:bg-gray-700 text-gray-900 dark:text-gray-100"
										/>
									</div>
								)}
							</>
						)}
					</div>

					<div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg border border-gray-300 dark:border-gray-700">
						<pre className="text-sm overflow-x-auto text-gray-800 dark:text-gray-200">
							{`customizeString('${string}', ${optionsCode})`}
						</pre>
					</div>
				</div>

				<div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
					<strong className="text-gray-800 dark:text-gray-200">
						Результат:
					</strong>{' '}
					<code className="text-sm text-gray-800 dark:text-gray-200">
						{result}
					</code>
				</div>
			</div>
		);
	},
};
