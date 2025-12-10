import type { Meta, StoryObj } from '@storybook/react';
import { parseDate } from './parseDate';

const meta = {
	title: 'Shared/Lib/Helpers/parseDate (To update)',
	tags: ['autodocs'],
	parameters: {
		layout: 'padded',
		docs: {
			description: {
				component:
					'Хелпер `parseDate` парсит строку с датой в объект Date с учетом локали. Поддерживает русский формат DD.MM.YYYY. Возвращает `null` если формат неверный или дата невалидна.',
			},
		},
	},
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Пример успешного парсинга даты.
 */
export const ValidDate: Story = {
	name: 'Валидная дата',
	parameters: {
		docs: {
			description: {
				story:
					'Пример успешного парсинга валидной даты в русском формате DD.MM.YYYY.',
			},
		},
	},
	render: () => {
		const dateString = '25.12.2024';
		const result = parseDate(dateString, 'ru');

		const formatDate = (date: Date) => {
			return {
				iso: date.toISOString(),
				year: date.getFullYear(),
				month: date.getMonth() + 1,
				day: date.getDate(),
				dayOfWeek: date.toLocaleDateString('ru', { weekday: 'long' }),
			};
		};

		return (
			<div className="space-y-4">
				<div className="grid grid-cols-2 gap-4">
					<div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg border border-gray-300 dark:border-gray-700">
						<div className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-2">
							Входная строка:
						</div>
						<pre className="text-sm overflow-x-auto text-gray-800 dark:text-gray-200">
							{dateString}
						</pre>
					</div>

					<div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg border border-gray-300 dark:border-gray-700">
						<div className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-2">
							Код:
						</div>
						<pre className="text-sm overflow-x-auto text-gray-800 dark:text-gray-200 font-mono">
							{`parseDate('${dateString}', 'ru')`}
						</pre>
					</div>
				</div>

				<div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
					<div className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-2">
						Результат (Date объект):
					</div>
					{result ? (
						<pre className="text-sm overflow-x-auto text-gray-800 dark:text-gray-200">
							{JSON.stringify(formatDate(result), null, 2)}
						</pre>
					) : (
						<div className="text-sm text-red-600 dark:text-red-400">null</div>
					)}
				</div>
			</div>
		);
	},
};
