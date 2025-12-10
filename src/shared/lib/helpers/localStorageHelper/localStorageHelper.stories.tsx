import type { Meta, StoryObj } from '@storybook/react';
import { localStorageHelper } from './localStorageHelper';

const meta = {
	title: 'Shared/Lib/Helpers/localStorageHelper',
	tags: ['autodocs'],
	parameters: {
		layout: 'padded',
		docs: {
			description: {
				component:
					'Хелпер `localStorageHelper` предоставляет удобный интерфейс для работы с `localStorage`. Возвращает объект с текущим значением из хранилища и методами для сохранения, удаления и очистки данных.',
			},
		},
	},
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Пример использования localStorageHelper для работы с объектом.
 */
export const WithObject: Story = {
	name: 'Работа с объектом',
	parameters: {
		docs: {
			description: {
				story:
					'Пример использования `localStorageHelper` для работы с объектом. Хелпер автоматически сериализует и десериализует данные при сохранении и получении.',
			},
		},
	},
	render: () => {
		const userData = {
			name: 'John',
			age: 30,
			email: 'john@example.com',
		};

		const { item, storageSetItem, storageRemoveItem } =
			localStorageHelper<typeof userData>('user');

		const codeExample = `const { item, storageSetItem, storageRemoveItem } = 
  localStorageHelper<typeof userData>('user');

// Сохранение данных
storageSetItem(userData);

// Получение данных
const savedData = item;

// Удаление данных
storageRemoveItem();`;

		return (
			<div className="space-y-4">
				<div className="grid grid-cols-2 gap-4">
					<div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg border border-gray-300 dark:border-gray-700">
						<div className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-2">
							Пример данных:
						</div>
						<pre className="text-sm overflow-x-auto text-gray-800 dark:text-gray-200">
							{JSON.stringify(userData, null, 2)}
						</pre>
					</div>

					<div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg border border-gray-300 dark:border-gray-700">
						<div className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-2">
							Код:
						</div>
						<pre className="text-sm overflow-x-auto text-gray-800 dark:text-gray-200 font-mono">
							{codeExample}
						</pre>
					</div>
				</div>

				<div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
					<strong className="text-gray-800 dark:text-gray-200">
						Возвращаемый объект:
					</strong>
					<pre className="mt-2 text-sm text-gray-800 dark:text-gray-200 overflow-x-auto">
						{JSON.stringify(
							{
								item: 'Текущее значение из localStorage (или {} если пусто)',
								storageSetItem: 'Функция для сохранения данных',
								storageRemoveItem: 'Функция для удаления данных по ключу',
								storageClear: 'Функция для очистки всего localStorage',
							},
							null,
							2,
						)}
					</pre>
				</div>
			</div>
		);
	},
};

/**
 * Пример использования localStorageHelper для работы со строкой.
 */
export const WithString: Story = {
	name: 'Работа со строкой',
	parameters: {
		docs: {
			description: {
				story:
					'Пример использования `localStorageHelper` для работы со строковыми данными. При сохранении строка будет сериализована в JSON, при получении - десериализована.',
			},
		},
	},
	render: () => {
		const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9';

		const codeExample = `const { item, storageSetItem, storageRemoveItem } = 
  localStorageHelper<string>('authToken');

// Сохранение токена
storageSetItem(token);

// Получение токена
const savedToken = item;

// Удаление токена
storageRemoveItem();`;

		return (
			<div className="space-y-4">
				<div className="grid grid-cols-2 gap-4">
					<div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg border border-gray-300 dark:border-gray-700">
						<div className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-2">
							Пример данных:
						</div>
						<pre className="text-sm overflow-x-auto text-gray-800 dark:text-gray-200">
							{JSON.stringify(token)}
						</pre>
					</div>

					<div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg border border-gray-300 dark:border-gray-700">
						<div className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-2">
							Код:
						</div>
						<pre className="text-sm overflow-x-auto text-gray-800 dark:text-gray-200 font-mono">
							{codeExample}
						</pre>
					</div>
				</div>

				<div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
					<strong className="text-gray-800 dark:text-gray-200">
						Примечание:
					</strong>
					<p className="mt-2 text-sm text-gray-800 dark:text-gray-200">
						При работе со строками данные будут сохранены как JSON-строка. При
						получении, если значение не является валидным JSON, вернется
						исходная строка или null.
					</p>
				</div>
			</div>
		);
	},
};

/**
 * Пример использования всех методов localStorageHelper.
 */
export const AllMethods: Story = {
	name: 'Все методы',
	parameters: {
		docs: {
			description: {
				story:
					'Демонстрация всех доступных методов, возвращаемых `localStorageHelper`.',
			},
		},
	},
	render: () => {
		const codeExample = `const helper = localStorageHelper<MyType>('myKey');

// Получение текущего значения
const currentValue = helper.item;

// Сохранение данных (частичное обновление)
helper.storageSetItem({ field: 'value' });

// Удаление данных по ключу
helper.storageRemoveItem();

// Очистка всего localStorage
helper.storageClear();`;

		const methodsDescription = {
			item: {
				description: 'Текущее значение из localStorage',
				type: 'T | {} | null',
				note: 'Возвращает {} если ключ отсутствует, или null если значение не является валидным JSON',
			},
			storageSetItem: {
				description: 'Сохраняет данные в localStorage',
				type: '(value: Partial<T>) => void',
				note: 'Автоматически сериализует данные в JSON',
			},
			storageRemoveItem: {
				description: 'Удаляет данные по ключу из localStorage',
				type: '() => void',
				note: 'Удаляет только данные для указанного ключа',
			},
			storageClear: {
				description: 'Очищает весь localStorage',
				type: '() => void',
				note: 'Внимание: удаляет все данные из localStorage, не только для текущего ключа',
			},
		};

		return (
			<div className="space-y-4">
				<div className="grid grid-cols-2 gap-4">
					<div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg border border-gray-300 dark:border-gray-700">
						<div className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-2">
							Код:
						</div>
						<pre className="text-sm overflow-x-auto text-gray-800 dark:text-gray-200 font-mono">
							{codeExample}
						</pre>
					</div>

					<div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg border border-gray-300 dark:border-gray-700">
						<div className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-2">
							Описание методов:
						</div>
						<div className="space-y-3 text-sm text-gray-800 dark:text-gray-200">
							{Object.entries(methodsDescription).map(([key, value]) => (
								<div key={key} className="border-b border-gray-300 dark:border-gray-600 pb-2 last:border-0">
									<div className="font-semibold text-blue-600 dark:text-blue-400">
										{key}
									</div>
									<div className="text-xs text-gray-600 dark:text-gray-400 mt-1">
										{value.type}
									</div>
									<div className="mt-1">{value.description}</div>
									<div className="text-xs text-gray-500 dark:text-gray-500 mt-1 italic">
										{value.note}
									</div>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		);
	},
};

