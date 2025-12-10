import type { Meta, StoryObj } from '@storybook/react';
import { useId, useState } from 'react';
import { dto } from './dto';

const meta = {
	title: 'Shared/Lib/Helpers/dto',
	tags: ['autodocs'],
	parameters: {
		layout: 'padded',
		docs: {
			description: {
				component:
					'Хелпер `dto` используется для преобразования объектов между форматами клиента (camelCase) и сервера (snake_case). Поддерживает вложенные объекты и массивы.',
			},
		},
	},
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Пример преобразования в формат сервера (camelCase -> snake_case).
 */
export const ToServer: Story = {
	name: 'toServer',
	parameters: {
		docs: {
			description: {
				story:
					'Преобразование объекта из формата клиента (camelCase) в формат сервера (snake_case).',
			},
		},
	},
	render: () => {
		const inputObject = {
			userName: 'John',
			userAge: 30,
			userEmail: 'john@example.com',
			userAddress: {
				streetName: 'Main Street',
				houseNumber: 123,
				postalCode: '12345',
			},
			userTags: ['developer', 'designer'],
		};

		const result = dto('toServer', inputObject);

		const formatObject = (obj: typeof inputObject | typeof result) => {
			return JSON.stringify(obj, null, 2);
		};

		return (
			<div className="space-y-4">
				<div className="grid grid-cols-2 gap-4">
					<div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg border border-gray-300 dark:border-gray-700">
						<div className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-2">
							Исходный объект (camelCase):
						</div>
						<pre className="text-sm overflow-x-auto text-gray-800 dark:text-gray-200">
							{formatObject(inputObject)}
						</pre>
					</div>

					<div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg border border-gray-300 dark:border-gray-700">
						<div className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-2">
							Код:
						</div>
						<pre className="text-sm overflow-x-auto text-gray-800 dark:text-gray-200">
							{`dto('toServer', ${formatObject(inputObject)})`}
						</pre>
					</div>
				</div>

				<div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
					<strong className="text-gray-800 dark:text-gray-200">
						Результат (snake_case):
					</strong>
					<pre className="mt-2 text-sm text-gray-800 dark:text-gray-200 overflow-x-auto">
						{formatObject(result)}
					</pre>
				</div>
			</div>
		);
	},
};

/**
 * Пример преобразования в формат клиента (snake_case -> camelCase).
 */
export const ToClient: Story = {
	name: 'toClient',
	parameters: {
		docs: {
			description: {
				story:
					'Преобразование объекта из формата сервера (snake_case) в формат клиента (camelCase).',
			},
		},
	},
	render: () => {
		const inputObject = {
			user_name: 'John',
			user_age: 30,
			user_email: 'john@example.com',
			user_address: {
				street_name: 'Main Street',
				house_number: 123,
				postal_code: '12345',
			},
			user_tags: ['developer', 'designer'],
		};

		const result = dto('toClient', inputObject);

		const formatObject = (obj: typeof inputObject | typeof result) => {
			return JSON.stringify(obj, null, 2);
		};

		return (
			<div className="space-y-4">
				<div className="grid grid-cols-2 gap-4">
					<div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg border border-gray-300 dark:border-gray-700">
						<div className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-2">
							Исходный объект (snake_case):
						</div>
						<pre className="text-sm overflow-x-auto text-gray-800 dark:text-gray-200">
							{formatObject(inputObject)}
						</pre>
					</div>

					<div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg border border-gray-300 dark:border-gray-700">
						<div className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-2">
							Код:
						</div>
						<pre className="text-sm overflow-x-auto text-gray-800 dark:text-gray-200">
							{`dto('toClient', ${formatObject(inputObject)})`}
						</pre>
					</div>
				</div>

				<div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
					<strong className="text-gray-800 dark:text-gray-200">
						Результат (camelCase):
					</strong>
					<pre className="mt-2 text-sm text-gray-800 dark:text-gray-200 overflow-x-auto">
						{formatObject(result)}
					</pre>
				</div>
			</div>
		);
	},
};

/**
 * Интерактивный пример использования dto.
 */
export const InteractiveExample: Story = {
	name: 'Интерактивный пример',
	parameters: {
		docs: {
			description: {
				story:
					'Интерактивный пример, демонстрирующий работу функции `dto`. Изменяйте JSON объект и тип преобразования, чтобы увидеть результат.',
			},
		},
	},
	render: () => {
		const jsonInputId = useId();
		const typeId = useId();

		const [jsonInput, setJsonInput] = useState(
			JSON.stringify(
				{
					userName: 'John',
					userAge: 30,
					userEmail: 'john@example.com',
				},
				null,
				2,
			),
		);
		const [type, setType] = useState<'toServer' | 'toClient'>('toServer');

		let inputObject: Record<string, unknown> = {};
		let parseError = '';

		try {
			inputObject = JSON.parse(jsonInput);
		} catch (error) {
			parseError =
				error instanceof Error ? error.message : 'Ошибка парсинга JSON';
		}

		const result = parseError ? null : dto(type, inputObject);

		const formatObject = (obj: Record<string, unknown>) => {
			return JSON.stringify(obj, null, 2);
		};

		return (
			<div className="space-y-4">
				<div className="grid grid-cols-2 gap-4">
					<div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg border border-gray-300 dark:border-gray-700 space-y-4">
						<div>
							<label
								htmlFor={typeId}
								className="block text-sm font-semibold mb-2 text-gray-800 dark:text-gray-200"
							>
								Тип преобразования:
							</label>
							<select
								id={typeId}
								value={type}
								onChange={(e) =>
									setType(e.target.value as 'toServer' | 'toClient')
								}
								className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded dark:bg-gray-700 text-gray-900 dark:text-gray-100"
							>
								<option value="toServer">
									toServer (camelCase → snake_case)
								</option>
								<option value="toClient">
									toClient (snake_case → camelCase)
								</option>
							</select>
						</div>

						<div>
							<label
								htmlFor={jsonInputId}
								className="block text-sm font-semibold mb-2 text-gray-800 dark:text-gray-200"
							>
								Исходный объект (JSON):
							</label>
							<textarea
								id={jsonInputId}
								value={jsonInput}
								onChange={(e) => setJsonInput(e.target.value)}
								style={{ height: '200px', resize: 'none' }}
								className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded dark:bg-gray-700 text-gray-900 dark:text-gray-100 font-mono text-sm overflow-y-auto"
								placeholder='{"userName": "John", "userAge": 30}'
							/>
							{parseError && (
								<div className="mt-2 text-sm text-red-600 dark:text-red-400">
									Ошибка: {parseError}
								</div>
							)}
						</div>
					</div>

					<div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg border border-gray-300 dark:border-gray-700">
						<div className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-2">
							Код:
						</div>
						<pre className="text-sm overflow-x-auto text-gray-800 dark:text-gray-200">
							{`dto('${type}', ${
								parseError ? jsonInput : formatObject(inputObject)
							})`}
						</pre>
					</div>
				</div>

				<div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
					<strong className="text-gray-800 dark:text-gray-200">
						Результат:
					</strong>
					{parseError ? (
						<div className="mt-2 text-sm text-red-600 dark:text-red-400">
							Исправьте ошибку в JSON
						</div>
					) : (
						<pre className="mt-2 text-sm text-gray-800 dark:text-gray-200 overflow-x-auto">
							{formatObject(result as Record<string, unknown>)}
						</pre>
					)}
				</div>
			</div>
		);
	},
};
