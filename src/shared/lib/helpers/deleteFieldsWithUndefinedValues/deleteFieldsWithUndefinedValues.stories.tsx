import type { Meta, StoryObj } from '@storybook/react';
import { deleteFieldsWithUndefinedValues } from './deleteFieldsWithUndefinedValues';

const meta = {
	title: 'Shared/Lib/Helpers/deleteFieldsWithUndefinedValues',
	tags: ['autodocs'],
	parameters: {
		layout: 'padded',
		docs: {
			description: {
				component:
					'Хелпер `deleteFieldsWithUndefinedValues` используется для удаления полей с `undefined` значениями из объекта. Возвращает новый объект без изменения исходного.',
			},
		},
	},
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Пример использования deleteFieldsWithUndefinedValues.
 */
export const Example: Story = {
	name: 'Пример',
	parameters: {
		docs: {
			description: {
				story:
					'Пример использования функции `deleteFieldsWithUndefinedValues`. Поля с `undefined` значениями удаляются из результирующего объекта.',
			},
		},
	},
	render: () => {
		const inputObject = {
			name: 'John',
			age: 30,
			email: undefined,
			phone: undefined,
			city: 'New York',
			country: undefined,
		};

		const result = deleteFieldsWithUndefinedValues(inputObject);

		// Форматируем объект с undefined для отображения
		const formatObjectWithUndefined = (obj: typeof inputObject) => {
			const entries = Object.entries(obj);
			const formatted = entries
				.map(([key, value]) => {
					if (value === undefined) {
						return `  ${key}: undefined`;
					}
					return `  ${key}: ${JSON.stringify(value)}`;
				})
				.join(',\n');
			return `{\n${formatted}\n}`;
		};

		return (
			<div className="space-y-4">
				<div className="grid grid-cols-2 gap-4">
					<div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg border border-gray-300 dark:border-gray-700">
						<div className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-2">
							Исходный объект:
						</div>
						<pre className="text-sm overflow-x-auto text-gray-800 dark:text-gray-200">
							{formatObjectWithUndefined(inputObject)}
						</pre>
					</div>

					<div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg border border-gray-300 dark:border-gray-700">
						<div className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-2">
							Код:
						</div>
						<pre className="text-sm overflow-x-auto text-gray-800 dark:text-gray-200">
							{`deleteFieldsWithUndefinedValues(${formatObjectWithUndefined(inputObject)})`}
						</pre>
					</div>
				</div>

				<div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
					<strong className="text-gray-800 dark:text-gray-200">
						Результат:
					</strong>
					<pre className="mt-2 text-sm text-gray-800 dark:text-gray-200 overflow-x-auto">
						{JSON.stringify(result, null, 2)}
					</pre>
				</div>
			</div>
		);
	},
};
