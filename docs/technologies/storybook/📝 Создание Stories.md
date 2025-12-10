# 📝 Создание Stories

## 📋 Базовый пример

```typescript
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

// Метаданные компонента
const meta = {
  title: 'Example/Button',
  component: Button,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

// Базовый вариант
export const Primary: Story = {
  args: {
    label: 'Button',
    primary: true,
  },
};

// Вторичный вариант
export const Secondary: Story = {
  args: {
    label: 'Button',
    primary: false,
  },
};
```

## 🎯 Структура Story файла

### 1. Импорты

```typescript
import type { Meta, StoryObj } from '@storybook/react';
import { Component } from './Component';
```

### 2. Метаданные (Meta)

```typescript
const meta = {
  title: 'Category/ComponentName',  // Путь в дереве Storybook
  component: Component,               // Компонент
  tags: ['autodocs'],                 // Автоматическая документация
  parameters: {                       // Параметры
    layout: 'centered',
  },
  argTypes: {                         // Описание аргументов
    label: {
      control: 'text',
      description: 'Текст кнопки',
    },
  },
} satisfies Meta<typeof Component>;
```

### 3. Экспорт метаданных

```typescript
export default meta;
type Story = StoryObj<typeof meta>;
```

### 4. Stories (именованные экспорты)

```typescript
export const Primary: Story = {
  args: {
    label: 'Primary Button',
  },
};
```

## 📝 Типы Stories

### Default Story (по умолчанию)

```typescript
export const Default: Story = {
  args: {
    label: 'Default Button',
  },
};
```

### С различными состояниями

```typescript
export const Primary: Story = {
  args: {
    label: 'Primary',
    primary: true,
  },
};

export const Secondary: Story = {
  args: {
    label: 'Secondary',
    primary: false,
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled',
    disabled: true,
  },
};
```

### С различными размерами

```typescript
export const Small: Story = {
  args: {
    label: 'Small',
    size: 'small',
  },
};

export const Large: Story = {
  args: {
    label: 'Large',
    size: 'large',
  },
};
```

## 🎨 Расширенные примеры

### Story с декораторами

```typescript
export const WithDecorator: Story = {
  decorators: [
    (Story) => (
      <div style={{ padding: '20px', background: '#f0f0f0' }}>
        <Story />
      </div>
    ),
  ],
  args: {
    label: 'Button with decorator',
  },
};
```

### Story с параметрами

```typescript
export const WithParameters: Story = {
  parameters: {
    backgrounds: {
      default: 'dark',
    },
  },
  args: {
    label: 'Button on dark background',
  },
};
```

### Интерактивная Story

```typescript
export const Interactive: Story = {
  args: {
    label: 'Click me',
    onClick: () => alert('Clicked!'),
  },
};
```

### Story с рендер-функцией

```typescript
export const CustomRender: Story = {
  render: (args) => (
    <div>
      <Button {...args} />
      <p>Additional content</p>
    </div>
  ),
  args: {
    label: 'Custom rendered button',
  },
};
```

## 📚 Документирование компонентов

### Добавление описания

```typescript
const meta = {
  title: 'Example/Button',
  component: Button,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Кнопка для выполнения действий в интерфейсе.',
      },
    },
  },
} satisfies Meta<typeof Button>;
```

### JSDoc комментарии

```typescript
/**
 * Основная кнопка приложения
 * 
 * @example
 * <Button label="Click me" primary />
 */
export const Primary: Story = {
  args: {
    label: 'Button',
    primary: true,
  },
};
```

## 🎯 Организация Stories

### По категориям

```typescript
title: 'Components/Button'      // Компоненты
title: 'Features/Auth/LoginForm' // Функциональность
title: 'Layout/Header'           // Макет
```

### Группировка

```typescript
title: 'Example/Button'          // Примеры
title: 'Example/Button/Variants' // Варианты
title: 'Example/Button/States'   // Состояния
```

## 🔗 Связанные документы

- [[🔧 Technologies|technologies/🔧 Technologies]] - Главная страница раздела Technologies
- [[📚 Storybook|📚 Storybook]] - Обзор Storybook
- [[📦 Установка и настройка|📦 Установка и настройка]] - Установка Storybook
- [[🔧 Конфигурация|🔧 Конфигурация]] - Настройка Storybook
- [[🎭 Декораторы|🎭 Декораторы]] - Использование глобальных и локальных декораторов
- [[✨ Best Practices|✨ Best Practices]] - Лучшие практики создания stories
- [[🚀 Запуск и деплой|🚀 Запуск и деплой]] - Запуск и деплой Storybook

