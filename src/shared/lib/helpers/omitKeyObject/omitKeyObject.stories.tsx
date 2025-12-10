import type { Meta, StoryObj } from '@storybook/react';
import { omitKeyObject } from './omitKeyObject';

const meta = {
	title: 'Shared/Lib/Helpers/omitKeyObject (To update)',
	tags: ['autodocs'],
	parameters: {
		layout: 'padded',
		docs: {
			description: {
				component:
					'Хелпер `omitKeyObject` создает новый объект, исключая указанный ключ из исходного объекта. Исходный объект не изменяется.',
			},
		},
	},
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Пример удаления одного ключа из объекта.
 */
export const BasicExample: Story = {
	name: 'Базовый пример',
	parameters: {
		docs: {
			description: {
				story:
					'Простой пример использования `omitKeyObject` для удаления одного ключа из объекта.',
			},
		},
	},
	render: () => {
		const user = {
			name: 'John',
			age: 30,
			email: 'john@example.com',
			city: 'New York',
		};

		const result = omitKeyObject('email', user);

		return (
			<div className="space-y-4">
				<div className="grid grid-cols-2 gap-4">
					<div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg border border-gray-300 dark:border-gray-700">
						<div className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-2">
							Исходный объект:
						</div>
						<pre className="text-sm overflow-x-auto text-gray-800 dark:text-gray-200">
							{JSON.stringify(user, null, 2)}
						</pre>
					</div>

					<div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg border border-gray-300 dark:border-gray-700">
						<div className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-2">
							Код:
						</div>
						<pre className="text-sm overflow-x-auto text-gray-800 dark:text-gray-200 font-mono">
							{`omitKeyObject('email', user)`}
						</pre>
					</div>
				</div>

				<div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
					<div className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-2">
						Результат:
					</div>
					<pre className="text-sm overflow-x-auto text-gray-800 dark:text-gray-200">
						{JSON.stringify(result, null, 2)}
					</pre>
					<div className="mt-2 text-xs text-gray-600 dark:text-gray-400">
						Примечание: ключ{' '}
						<code className="px-1 py-0.5 bg-gray-200 dark:bg-gray-700 rounded">
							email
						</code>{' '}
						был удален из объекта
					</div>
				</div>
			</div>
		);
	},
};

/**
 * Пример удаления разных ключей.
 */
export const DifferentKeys: Story = {
	name: 'Удаление разных ключей',
	parameters: {
		docs: {
			description: {
				story: 'Примеры удаления различных ключей из одного и того же объекта.',
			},
		},
	},
	render: () => {
		const product = {
			id: 1,
			name: 'Laptop',
			price: 999.99,
			category: 'Electronics',
			inStock: true,
		};

		const result1 = omitKeyObject('price', product);
		const result2 = omitKeyObject('category', product);
		const result3 = omitKeyObject('inStock', product);

		return (
			<div className="space-y-4">
				<div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg border border-gray-300 dark:border-gray-700">
					<div className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-2">
						Исходный объект:
					</div>
					<pre className="text-sm overflow-x-auto text-gray-800 dark:text-gray-200">
						{JSON.stringify(product, null, 2)}
					</pre>
				</div>

				<div className="grid grid-cols-3 gap-4">
					<div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
						<div className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-2">
							Удаление 'price':
						</div>
						<pre className="text-xs overflow-x-auto text-gray-800 dark:text-gray-200 font-mono mb-2">
							{`omitKeyObject('price', product)`}
						</pre>
						<pre className="text-xs overflow-x-auto text-gray-800 dark:text-gray-200">
							{JSON.stringify(result1, null, 2)}
						</pre>
					</div>

					<div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
						<div className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-2">
							Удаление 'category':
						</div>
						<pre className="text-xs overflow-x-auto text-gray-800 dark:text-gray-200 font-mono mb-2">
							{`omitKeyObject('category', product)`}
						</pre>
						<pre className="text-xs overflow-x-auto text-gray-800 dark:text-gray-200">
							{JSON.stringify(result2, null, 2)}
						</pre>
					</div>

					<div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
						<div className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-2">
							Удаление 'inStock':
						</div>
						<pre className="text-xs overflow-x-auto text-gray-800 dark:text-gray-200 font-mono mb-2">
							{`omitKeyObject('inStock', product)`}
						</pre>
						<pre className="text-xs overflow-x-auto text-gray-800 dark:text-gray-200">
							{JSON.stringify(result3, null, 2)}
						</pre>
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
					'Функция работает только на первом уровне объекта. Вложенные объекты сохраняются как есть.',
			},
		},
	},
	render: () => {
		const user = {
			name: 'John',
			age: 30,
			address: {
				city: 'New York',
				street: 'Main St',
				zip: '10001',
			},
			email: 'john@example.com',
		};

		const result = omitKeyObject('address', user);

		return (
			<div className="space-y-4">
				<div className="grid grid-cols-2 gap-4">
					<div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg border border-gray-300 dark:border-gray-700">
						<div className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-2">
							Исходный объект:
						</div>
						<pre className="text-sm overflow-x-auto text-gray-800 dark:text-gray-200">
							{JSON.stringify(user, null, 2)}
						</pre>
					</div>

					<div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg border border-gray-300 dark:border-gray-700">
						<div className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-2">
							Код:
						</div>
						<pre className="text-sm overflow-x-auto text-gray-800 dark:text-gray-200 font-mono">
							{`omitKeyObject('address', user)`}
						</pre>
					</div>
				</div>

				<div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
					<div className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-2">
						Результат:
					</div>
					<pre className="text-sm overflow-x-auto text-gray-800 dark:text-gray-200">
						{JSON.stringify(result, null, 2)}
					</pre>
					<div className="mt-2 text-xs text-gray-600 dark:text-gray-400">
						Примечание: весь вложенный объект{' '}
						<code className="px-1 py-0.5 bg-gray-200 dark:bg-gray-700 rounded">
							address
						</code>{' '}
						был удален
					</div>
				</div>
			</div>
		);
	},
};

/**
 * Пример неизменяемости исходного объекта.
 */
export const Immutability: Story = {
	name: 'Неизменяемость',
	parameters: {
		docs: {
			description: {
				story:
					'Функция создает новый объект, не изменяя исходный. Это важно для работы с иммутабельными данными.',
			},
		},
	},
	render: () => {
		const original = {
			name: 'John',
			age: 30,
			email: 'john@example.com',
		};

		const result = omitKeyObject('email', original);

		return (
			<div className="space-y-4">
				<div className="grid grid-cols-2 gap-4">
					<div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg border border-gray-300 dark:border-gray-700">
						<div className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-2">
							Исходный объект (после вызова функции):
						</div>
						<pre className="text-sm overflow-x-auto text-gray-800 dark:text-gray-200">
							{JSON.stringify(original, null, 2)}
						</pre>
						<div className="mt-2 text-xs text-green-600 dark:text-green-400">
							✓ Объект не изменился
						</div>
					</div>

					<div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg border border-gray-300 dark:border-gray-700">
						<div className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-2">
							Код:
						</div>
						<pre className="text-sm overflow-x-auto text-gray-800 dark:text-gray-200 font-mono">
							{`const result = omitKeyObject('email', original);
// original остается без изменений`}
						</pre>
					</div>
				</div>

				<div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
					<div className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-2">
						Новый объект (результат):
					</div>
					<pre className="text-sm overflow-x-auto text-gray-800 dark:text-gray-200">
						{JSON.stringify(result, null, 2)}
					</pre>
					<div className="mt-2 text-xs text-gray-600 dark:text-gray-400">
						Примечание: это новый объект, не связанный с исходным
					</div>
				</div>
			</div>
		);
	},
};
