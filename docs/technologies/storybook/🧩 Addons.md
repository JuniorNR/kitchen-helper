# 🧩 Полезные аддоны для Storybook

Подборка аддонов, которые чаще всего применяются для разработки, документирования и тестирования компонентов. Все примеры команд даны для `pnpm`; при необходимости замените на `npm`/`yarn`.

## 📦 Essentials (набор по умолчанию)

Включает Actions, Controls, Docs, Viewport, Backgrounds, Measure, Outline и др.

Установка:
```bash
pnpm add -D @storybook/addon-essentials
```

В `main.ts`:
```ts
addons: [
  '@storybook/addon-essentials',
],
```

## 👀 Docs
Генерация документации и автодока компонентов.

Установка (если не используете essentials):
```bash
pnpm add -D @storybook/addon-docs
```
В `main.ts`:
```ts
addons: ['@storybook/addon-docs'];
```

## ♿ A11y
Проверка доступности (ARIA, контраст и др.).

Установка:
```bash
pnpm add -D @storybook/addon-a11y
```
В `main.ts`:
```ts
addons: ['@storybook/addon-a11y'];
```
Использование в stories:
```ts
export const Accessible = {
  parameters: {
    a11y: { disable: false },
  },
};
```

## 🎮 Interactions / Testing
Тестирование взаимодействий (play-функции, userEvent, assertions).

Установка:
```bash
pnpm add -D @storybook/addon-interactions @storybook/test
```
В `main.ts`:
```ts
addons: ['@storybook/addon-interactions'];
```
Пример:
```ts
import { within, userEvent } from '@storybook/test';

export const Clicks: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('button'));
  },
};
```

## 📱 Viewport
Проверка компонентов на разных разрешениях.

Установка (если не через essentials):
```bash
pnpm add -D @storybook/addon-viewport
```
Пример:
```ts
export const Mobile = {
  parameters: {
    viewport: { defaultViewport: 'iphone6' },
  },
};
```

## 🖼️ Backgrounds
Быстрая смена фона (светлый/тёмный/брендовый).

Установка:
```bash
pnpm add -D @storybook/addon-backgrounds
```
Пример:
```ts
export const OnDark = {
  parameters: {
    backgrounds: {
      default: 'dark',
      values: [
        { name: 'dark', value: '#1a1a1a' },
        { name: 'light', value: '#ffffff' },
      ],
    },
  },
};
```

## 📏 Measure / Outline
Подсветка размеров и границ элементов для отладки в Canvas.

Установка:
```bash
pnpm add -D @storybook/addon-measure @storybook/addon-outline
```

## 🎛️ Toolbars
Кастомные тулбары для смены темы/языка/среды.

Документация: [Toolbars](https://storybook.js.org/docs/react/essentials/toolbars-and-globals)

Пример добавления глобалов в `preview.ts`:
```ts
export const globalTypes = {
  theme: {
    name: 'Theme',
    description: 'Light or dark theme',
    defaultValue: 'light',
    toolbar: {
      icon: 'circlehollow',
      items: [
        { value: 'light', title: 'Light' },
        { value: 'dark', title: 'Dark' },
      ],
    },
  },
};
```

## 🌐 I18n (пример)
Смена языка интерфейса через глобалы.

```ts
export const globalTypes = {
  locale: {
    name: 'Locale',
    description: 'Internationalization locale',
    defaultValue: 'ru',
    toolbar: {
      icon: 'globe',
      items: [
        { value: 'ru', title: 'Русский' },
        { value: 'en', title: 'English' },
      ],
    },
  },
};
```

## 🛠️ Как добавить аддон
1. Установите пакет: `pnpm add -D <addon>`
2. Подключите в `.storybook/main.ts` в массив `addons`
3. При необходимости добавьте параметры/декораторы в `.storybook/preview.ts`

## 🔗 Связанные документы
- [[📚 Storybook|technologies/storybook/📚 Storybook]] - Обзор Storybook
- [[📦 Установка и настройка|technologies/storybook/📦 Установка и настройка]] - Установка Storybook
- [[🔧 Конфигурация|technologies/storybook/🔧 Конфигурация]] - Настройка Storybook
- [[🎭 Декораторы|technologies/storybook/🎭 Декораторы]] - Использование глобальных и локальных обёрток
- [[📝 Создание Stories|technologies/storybook/📝 Создание Stories]] - Создание stories
- [[✨ Best Practices|technologies/storybook/✨ Best Practices]] - Лучшие практики
- [[🚀 Запуск и деплой|technologies/storybook/🚀 Запуск и деплой]] - Запуск и деплой Storybook

