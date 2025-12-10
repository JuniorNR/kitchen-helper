import type { Meta, StoryObj } from '@storybook/react';
import { mergeUniqueKeysObjects } from './mergeUniqueKeysObjects';

const meta = {
	title: 'Shared/Lib/Helpers/mergeUniqueKeysObjects',
	tags: ['autodocs'],
	parameters: {
		layout: 'padded',
		docs: {
			description: {
				component:
					'Хелпер `mergeUniqueKeysObjects` объединяет два объекта, сохраняя все уникальные ключи из обоих объектов. Поля с `undefined` значениями автоматически удаляются из результирующего объекта.',
			},
		},
	},
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Пример объединения объектов с уникальными ключами.
 */
export const BasicExample: Story = {
	name: 'Базовый пример',
	parameters: {
		docs: {
			description: {
				story:
					'Простой пример объединения двух объектов. Все ключи из обоих объектов сохраняются в результате.',
			},
		},
	},
	render: () => {
		const obj1 = {
			name: 'John',
			age: 30,
			city: 'New York',
		};

		const obj2 = {
			email: 'john@example.com',
			phone: '123-456-7890',
			country: 'USA',
		};

		const result = mergeUniqueKeysObjects(obj1, obj2);

		return (
			<div className="space-y-4">
				<div className="grid grid-cols-2 gap-4">
					<div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg border border-gray-300 dark:border-gray-700">
						<div className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-2">
							Первый объект:
						</div>
						<pre className="text-sm overflow-x-auto text-gray-800 dark:text-gray-200">
							{JSON.stringify(obj1, null, 2)}
						</pre>
					</div>

					<div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg border border-gray-300 dark:border-gray-700">
						<div className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-2">
							Второй объект:
						</div>
						<pre className="text-sm overflow-x-auto text-gray-800 dark:text-gray-200">
							{JSON.stringify(obj2, null, 2)}
						</pre>
					</div>
				</div>

				<div className="grid grid-cols-2 gap-4">
					<div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg border border-gray-300 dark:border-gray-700">
						<div className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-2">
							Код:
						</div>
						<pre className="text-sm overflow-x-auto text-gray-800 dark:text-gray-200 font-mono">
							{`mergeUniqueKeysObjects(obj1, obj2)`}
						</pre>
					</div>

					<div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
						<div className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-2">
							Результат:
						</div>
						<pre className="text-sm overflow-x-auto text-gray-800 dark:text-gray-200">
							{JSON.stringify(result, null, 2)}
						</pre>
					</div>
				</div>
			</div>
		);
	},
};

/**
 * Пример с перекрывающимися ключами.
 */
export const OverlappingKeys: Story = {
	name: 'Перекрывающиеся ключи',
	parameters: {
		docs: {
			description: {
				story:
					'Когда объекты содержат одинаковые ключи, значения из второго объекта перезаписывают значения из первого.',
			},
		},
	},
	render: () => {
		const obj1 = {
			name: 'John',
			age: 30,
			city: 'New York',
		};

		const obj2 = {
			age: 35,
			city: 'Los Angeles',
			email: 'john@example.com',
		};

		const result = mergeUniqueKeysObjects(obj1, obj2);

		return (
			<div className="space-y-4">
				<div className="grid grid-cols-2 gap-4">
					<div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg border border-gray-300 dark:border-gray-700">
						<div className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-2">
							Первый объект:
						</div>
						<pre className="text-sm overflow-x-auto text-gray-800 dark:text-gray-200">
							{JSON.stringify(obj1, null, 2)}
						</pre>
					</div>

					<div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg border border-gray-300 dark:border-gray-700">
						<div className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-2">
							Второй объект:
						</div>
						<pre className="text-sm overflow-x-auto text-gray-800 dark:text-gray-200">
							{JSON.stringify(obj2, null, 2)}
						</pre>
					</div>
				</div>

				<div className="grid grid-cols-2 gap-4">
					<div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg border border-gray-300 dark:border-gray-700">
						<div className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-2">
							Код:
						</div>
						<pre className="text-sm overflow-x-auto text-gray-800 dark:text-gray-200 font-mono">
							{`mergeUniqueKeysObjects(obj1, obj2)`}
						</pre>
					</div>

					<div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
						<div className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-2">
							Результат:
						</div>
						<pre className="text-sm overflow-x-auto text-gray-800 dark:text-gray-200">
							{JSON.stringify(result, null, 2)}
						</pre>
						<div className="mt-2 text-xs text-gray-600 dark:text-gray-400">
							Примечание: значения <code className="px-1 py-0.5 bg-gray-200 dark:bg-gray-700 rounded">age</code> и{' '}
							<code className="px-1 py-0.5 bg-gray-200 dark:bg-gray-700 rounded">city</code> из второго объекта
							перезаписали значения из первого
						</div>
					</div>
				</div>
			</div>
		);
	},
};

/**
 * Пример с undefined значениями.
 */
export const WithUndefined: Story = {
	name: 'Удаление undefined',
	parameters: {
		docs: {
			description: {
				story:
					'Поля с `undefined` значениями автоматически удаляются из результирующего объекта.',
			},
		},
	},
	render: () => {
		const obj1 = {
			name: 'John',
			age: 30,
			email: undefined,
		};

		const obj2 = {
			city: 'New York',
			phone: undefined,
			country: 'USA',
		};

		const result = mergeUniqueKeysObjects(obj1, obj2);

		const formatObjectWithUndefined = (obj: typeof obj1 | typeof obj2) => {
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
							Первый объект:
						</div>
						<pre className="text-sm overflow-x-auto text-gray-800 dark:text-gray-200">
							{formatObjectWithUndefined(obj1)}
						</pre>
					</div>

					<div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg border border-gray-300 dark:border-gray-700">
						<div className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-2">
							Второй объект:
						</div>
						<pre className="text-sm overflow-x-auto text-gray-800 dark:text-gray-200">
							{formatObjectWithUndefined(obj2)}
						</pre>
					</div>
				</div>

				<div className="grid grid-cols-2 gap-4">
					<div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg border border-gray-300 dark:border-gray-700">
						<div className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-2">
							Код:
						</div>
						<pre className="text-sm overflow-x-auto text-gray-800 dark:text-gray-200 font-mono">
							{`mergeUniqueKeysObjects(obj1, obj2)`}
						</pre>
					</div>

					<div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
						<div className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-2">
							Результат:
						</div>
						<pre className="text-sm overflow-x-auto text-gray-800 dark:text-gray-200">
							{JSON.stringify(result, null, 2)}
						</pre>
						<div className="mt-2 text-xs text-gray-600 dark:text-gray-400">
							Примечание: поля <code className="px-1 py-0.5 bg-gray-200 dark:bg-gray-700 rounded">email</code> и{' '}
							<code className="px-1 py-0.5 bg-gray-200 dark:bg-gray-700 rounded">phone</code> с undefined значениями были удалены
						</div>
					</div>
				</div>
			</div>
		);
	},
};

/**
 * Пример с вложенными объектами.
 */
export const WithNestedObjects: Story = {
	name: 'Вложенные объекты',
	parameters: {
		docs: {
			description: {
				story:
					'Функция работает только на первом уровне вложенности. Вложенные объекты не объединяются рекурсивно.',
			},
		},
	},
	render: () => {
		const obj1 = {
			name: 'John',
			address: {
				city: 'New York',
				street: 'Main St',
			},
		};

		const obj2 = {
			age: 30,
			address: {
				zip: '10001',
			},
		};

		const result = mergeUniqueKeysObjects(obj1, obj2);

		return (
			<div className="space-y-4">
				<div className="grid grid-cols-2 gap-4">
					<div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg border border-gray-300 dark:border-gray-700">
						<div className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-2">
							Первый объект:
						</div>
						<pre className="text-sm overflow-x-auto text-gray-800 dark:text-gray-200">
							{JSON.stringify(obj1, null, 2)}
						</pre>
					</div>

					<div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg border border-gray-300 dark:border-gray-700">
						<div className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-2">
							Второй объект:
						</div>
						<pre className="text-sm overflow-x-auto text-gray-800 dark:text-gray-200">
							{JSON.stringify(obj2, null, 2)}
						</pre>
					</div>
				</div>

				<div className="grid grid-cols-2 gap-4">
					<div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg border border-gray-300 dark:border-gray-700">
						<div className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-2">
							Код:
						</div>
						<pre className="text-sm overflow-x-auto text-gray-800 dark:text-gray-200 font-mono">
							{`mergeUniqueKeysObjects(obj1, obj2)`}
						</pre>
					</div>

					<div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
						<div className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-2">
							Результат:
						</div>
						<pre className="text-sm overflow-x-auto text-gray-800 dark:text-gray-200">
							{JSON.stringify(result, null, 2)}
						</pre>
						<div className="mt-2 text-xs text-gray-600 dark:text-gray-400">
							Примечание: вложенный объект <code className="px-1 py-0.5 bg-gray-200 dark:bg-gray-700 rounded">address</code> из второго объекта полностью заменил объект из первого
						</div>
					</div>
				</div>
			</div>
		);
	},
};

