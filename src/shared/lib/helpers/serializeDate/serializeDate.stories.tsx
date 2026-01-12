import type { Meta, StoryObj } from '@storybook/react';
import { serializeDate } from './serializeDate';

const meta = {
	title: 'Shared/Lib/Helpers/serializeDate',
	tags: ['autodocs'],
	parameters: {
		layout: 'padded',
		docs: {
			description: {
				component:
					'Хелпер `serializeDate` преобразует Date объект или строку в ISO строку для отправки на сервер. Если передана строка, возвращает её без изменений. Если передан Date, преобразует в ISO строку через `toISOString()`. Возвращает `undefined` если передан `undefined`.',
			},
		},
	},
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Пример преобразования из Date объекта.
 */
export const FromDateObject: Story = {
	name: 'Из Date объекта',
	parameters: {
		docs: {
			description: {
				story:
					'Примеры преобразования Date объектов в ISO строку для отправки на сервер.',
			},
		},
	},
	render: () => {
		const examples = [
			{
				input: new Date(2024, 11, 25),
				output: serializeDate(new Date(2024, 11, 25)),
				description: '25 декабря 2024',
			},
			{
				input: new Date(2024, 0, 1, 12, 30, 45),
				output: serializeDate(new Date(2024, 0, 1, 12, 30, 45)),
				description: '1 января 2024, 12:30:45',
			},
			{
				input: new Date(2023, 5, 15),
				output: serializeDate(new Date(2023, 5, 15)),
				description: '15 июня 2023',
			},
		];

		return (
			<div className="space-y-4">
				<div className="grid grid-cols-2 gap-4">
					<div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg border border-gray-300 dark:border-gray-700">
						<div className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-2">
							Код:
						</div>
						<pre className="text-sm overflow-x-auto text-gray-800 dark:text-gray-200 font-mono">
							{`const date = new Date(2024, 11, 25);
serializeDate(date)`}
						</pre>
					</div>

					<div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg border border-gray-300 dark:border-gray-700">
						<div className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-2">
							Примеры:
						</div>
						<div className="space-y-2">
							{examples.map(({ input, output, description }) => (
								<div
									key={input.toISOString()}
									className="p-2 bg-white dark:bg-gray-700/50 rounded border border-gray-200 dark:border-gray-600"
								>
									<div
										className="text-xs font-mono"
										style={{ color: '#000000' }}
									>
										{input.toLocaleString('ru')} → {output}
									</div>
									<div
										className="text-xs mt-1 italic"
										style={{ color: '#000000' }}
									>
										{description}
									</div>
								</div>
							))}
						</div>
					</div>
				</div>

				<div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
					<div className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-2">
						Примечание:
					</div>
					<p className="text-sm text-gray-800 dark:text-gray-200">
						Date объекты преобразуются в ISO строку через{' '}
						<code className="px-1 py-0.5 bg-gray-200 dark:bg-gray-700 rounded">
							toISOString()
						</code>
						, что включает время и часовой пояс (UTC).
					</p>
				</div>
			</div>
		);
	},
};

/**
 * Пример преобразования из строки.
 */
export const FromString: Story = {
	name: 'Из строки',
	parameters: {
		docs: {
			description: {
				story:
					'Если передана строка, функция возвращает её без изменений. Это полезно, когда дата уже в нужном формате.',
			},
		},
	},
	render: () => {
		const examples = [
			{
				input: '2024-12-25',
				output: serializeDate('2024-12-25'),
				description: 'Строка в формате YYYY-MM-DD',
			},
			{
				input: '2024-12-25T12:30:45.000Z',
				output: serializeDate('2024-12-25T12:30:45.000Z'),
				description: 'ISO строка',
			},
			{
				input: '25.12.2024',
				output: serializeDate('25.12.2024'),
				description: 'Русский формат (возвращается как есть)',
			},
		];

		return (
			<div className="space-y-4">
				<div className="grid grid-cols-2 gap-4">
					<div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg border border-gray-300 dark:border-gray-700">
						<div className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-2">
							Код:
						</div>
						<pre className="text-sm overflow-x-auto text-gray-800 dark:text-gray-200 font-mono">
							{`serializeDate('2024-12-25')`}
						</pre>
					</div>

					<div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg border border-gray-300 dark:border-gray-700">
						<div className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-2">
							Примеры:
						</div>
						<div className="space-y-2">
							{examples.map(({ input, output, description }) => (
								<div
									key={input}
									className="p-2 bg-white dark:bg-gray-700/50 rounded border border-gray-200 dark:border-gray-600"
								>
									<div
										className="text-xs font-mono"
										style={{ color: '#000000' }}
									>
										{input} → {output}
									</div>
									<div
										className="text-xs mt-1 italic"
										style={{ color: '#000000' }}
									>
										{description}
									</div>
								</div>
							))}
						</div>
					</div>
				</div>

				<div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
					<div className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-2">
						Примечание:
					</div>
					<p className="text-sm text-gray-800 dark:text-gray-200">
						Строки возвращаются без изменений, независимо от формата. Функция не
						проверяет и не преобразует формат строки.
					</p>
				</div>
			</div>
		);
	},
};

/**
 * Примеры с undefined.
 */
export const WithUndefined: Story = {
	name: 'С undefined',
	parameters: {
		docs: {
			description: {
				story:
					'Если передан `undefined`, функция возвращает `undefined`. Это полезно для опциональных полей в формах.',
			},
		},
	},
	render: () => {
		const examples = [
			{
				input: 'undefined',
				output: serializeDate(undefined),
				description: 'undefined значение',
			},
		];

		return (
			<div className="space-y-4">
				<div className="grid grid-cols-2 gap-4">
					<div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg border border-gray-300 dark:border-gray-700">
						<div className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-2">
							Код:
						</div>
						<pre className="text-sm overflow-x-auto text-gray-800 dark:text-gray-200 font-mono">
							{`serializeDate(undefined)`}
						</pre>
					</div>

					<div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg border border-gray-300 dark:border-gray-700">
						<div className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-2">
							Примеры:
						</div>
						<div className="space-y-2">
							{examples.map(({ input, output, description }) => (
								<div
									key={input}
									className="p-2 bg-white dark:bg-gray-700/50 rounded border border-gray-200 dark:border-gray-600"
								>
									<div
										className="text-xs font-mono"
										style={{ color: '#000000' }}
									>
										{input} → {output === undefined ? 'undefined' : output}
									</div>
									<div
										className="text-xs mt-1 italic"
										style={{ color: '#000000' }}
									>
										{description}
									</div>
								</div>
							))}
						</div>
					</div>
				</div>

				<div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
					<div className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-2">
						Примечание:
					</div>
					<p className="text-sm text-gray-800 dark:text-gray-200">
						Возврат{' '}
						<code className="px-1 py-0.5 bg-gray-200 dark:bg-gray-700 rounded">
							undefined
						</code>{' '}
						позволяет серверу определить, что поле не было заполнено, в отличие
						от пустой строки.
					</p>
				</div>
			</div>
		);
	},
};

/**
 * Пример использования для отправки на сервер.
 */
export const UsageForServer: Story = {
	name: 'Использование для отправки на сервер',
	parameters: {
		docs: {
			description: {
				story:
					'Пример использования функции для сериализации дат перед отправкой на сервер через API.',
			},
		},
	},
	render: () => {
		const codeExample = `import { serializeDate } from '@/shared/lib/helpers';

// Пример данных формы
const formData = {
  title: 'Рецепт',
  createdAt: new Date(2024, 11, 25),
  updatedAt: new Date(2024, 11, 26),
};

// Сериализация для отправки на сервер
const payload = {
  title: formData.title,
  created_at: serializeDate(formData.createdAt),
  updated_at: serializeDate(formData.updatedAt),
};

// Отправка на сервер
fetch('/api/recipes', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(payload),
});`;

		return (
			<div className="space-y-4">
				<div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg border border-gray-300 dark:border-gray-700">
					<div className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-2">
						Пример кода:
					</div>
					<pre className="text-sm overflow-x-auto text-gray-800 dark:text-gray-200 font-mono">
						{codeExample}
					</pre>
				</div>

				<div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
					<div className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-2">
						Преимущества:
					</div>
					<ul className="text-sm text-gray-800 dark:text-gray-200 space-y-1 list-disc list-inside">
						<li>
							Автоматическое преобразование Date объектов в ISO строку для JSON
						</li>
						<li>Строки остаются без изменений, если уже в нужном формате</li>
						<li>
							<code className="px-1 py-0.5 bg-gray-200 dark:bg-gray-700 rounded">
								undefined
							</code>{' '}
							значения не включаются в JSON (если используется JSON.stringify)
						</li>
						<li>
							Удобно для работы с формами, где даты могут быть Date объектами
							или строками
						</li>
					</ul>
				</div>
			</div>
		);
	},
};

/**
 * Пример совместного использования с parseDate.
 */
export const WithParseDate: Story = {
	name: 'Совместное использование с parseDate',
	parameters: {
		docs: {
			description: {
				story:
					'Пример преобразования дат между пользовательским форматом (DD.MM.YYYY) и форматом сервера (ISO) с использованием `parseDate` и `serializeDate`.',
			},
		},
	},
	render: () => {
		const codeExample = `import { parseDate, serializeDate } from '@/shared/lib/helpers';

// Пользователь вводит дату в русском формате
const userInput = '25.12.2024';

// Парсинг в Date объект
const date = parseDate(userInput, 'ru');

// Сериализация для отправки на сервер
if (date) {
  const serverDate = serializeDate(date);
  // Результат: "2024-12-25T00:00:00.000Z"
  
  // Отправка на сервер
  sendToServer(serverDate);
}`;

		const examples = [
			{
				step: 'Пользовательский ввод',
				value: '25.12.2024',
				description: 'Русский формат DD.MM.YYYY',
			},
			{
				step: 'После parseDate',
				value: 'Date объект',
				description: 'new Date(2024, 11, 25)',
			},
			{
				step: 'После serializeDate',
				value: serializeDate(new Date(2024, 11, 25)),
				description: 'ISO строка для сервера',
			},
		];

		return (
			<div className="space-y-4">
				<div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg border border-gray-300 dark:border-gray-700">
					<div className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-2">
						Пример кода:
					</div>
					<pre className="text-sm overflow-x-auto text-gray-800 dark:text-gray-200 font-mono">
						{codeExample}
					</pre>
				</div>

				<div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg border border-gray-300 dark:border-gray-700">
					<div className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-3">
						Процесс преобразования:
					</div>
					<div className="space-y-2">
						{examples.map(({ step, value, description }) => (
							<div
								key={step}
								className="p-2 bg-white dark:bg-gray-700/50 rounded border border-gray-200 dark:border-gray-600"
							>
								<div
									className="text-xs font-semibold"
									style={{ color: '#000000' }}
								>
									{step}:
								</div>
								<div
									className="text-xs font-mono mt-1"
									style={{ color: '#000000' }}
								>
									{value}
								</div>
								<div
									className="text-xs mt-1 italic"
									style={{ color: '#000000' }}
								>
									{description}
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		);
	},
};
