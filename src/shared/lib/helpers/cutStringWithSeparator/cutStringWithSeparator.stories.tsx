import type { Meta, StoryObj } from '@storybook/react';
import { useId, useState } from 'react';
import { cutStringWithSeparator } from './cutStringWithSeparator';

const meta = {
	title: 'Shared/Lib/Helpers/cutStringWithSeparator',
	tags: ['autodocs'],
	parameters: {
		layout: 'padded',
		docs: {
			description: {
				component:
					'Хелпер `cutStringWithSeparator` используется для обрезки строки до определенного количества символов с добавлением разделителя.',
			},
		},
	},
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Интерактивный пример использования cutStringWithSeparator.
 */
export const InteractiveExample: Story = {
	name: 'Интерактивный пример',
	parameters: {
		docs: {
			description: {
				story:
					'Интерактивный пример, демонстрирующий работу функции `cutStringWithSeparator`. Изменяйте параметры ниже, чтобы увидеть, как меняется результат.',
			},
		},
	},
	render: () => {
		const stringId = useId();
		const countSliceId = useId();
		const separatorId = useId();

		const [string, setString] = useState('Привет, мир!');
		const [countSlice, setCountSlice] = useState('5');
		const [separator, setSeparator] = useState('..');

		const countSliceNum = countSlice ? parseInt(countSlice, 10) : 0;
		const result = cutStringWithSeparator(
			string,
			countSliceNum,
			separator || undefined,
		);

		return (
			<div className="space-y-4">
				<div className="grid grid-cols-2 gap-4">
					<div className="grid grid-cols-1 gap-4 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg border border-gray-300 dark:border-gray-700">
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
								htmlFor={countSliceId}
								className="block text-sm font-medium mb-1 text-gray-800 dark:text-gray-200"
							>
								Количество символов (countSlice):
							</label>
							<input
								id={countSliceId}
								type="number"
								value={countSlice}
								onChange={(e) => setCountSlice(e.target.value)}
								className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded dark:bg-gray-700 text-gray-900 dark:text-gray-100"
								min="0"
							/>
						</div>

						<div>
							<label
								htmlFor={separatorId}
								className="block text-sm font-medium mb-1 text-gray-800 dark:text-gray-200"
							>
								Разделитель (separator, опционально):
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
					</div>

					<div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg border border-gray-300 dark:border-gray-700">
						<pre className="text-sm overflow-x-auto text-gray-800 dark:text-gray-200">
							{`cutStringWithSeparator(
  '${string}',
  ${countSliceNum},
  ${separator ? `'${separator}'` : 'undefined'}
)`}
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
