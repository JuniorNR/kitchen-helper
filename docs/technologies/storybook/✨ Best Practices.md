# ✨ Best Practices для Storybook

## 📁 Организация Stories

### Структура файлов

```
src/
├── components/
│   ├── Button/
│   │   ├── Button.tsx
│   │   ├── Button.stories.tsx
│   │   └── Button.test.tsx
│   └── Card/
│       ├── Card.tsx
│       └── Card.stories.tsx
```

### Группировка по категориям

```typescript
// Компоненты
title: 'Components/Button'

// Функциональность
title: 'Features/Auth/LoginForm'

// Макет
title: 'Layout/Header'

// Виджеты
title: 'Widgets/UserProfile'
```

### Понятные названия

✅ **Хорошо:**
```typescript
export const Primary: Story = { ... }
export const WithIcon: Story = { ... }
export const Disabled: Story = { ... }
```

❌ **Плохо:**
```typescript
export const Story1: Story = { ... }
export const Test: Story = { ... }
export const Default2: Story = { ... }
```

## 📝 Документирование

### Описания компонентов

```typescript
const meta = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    docs: {
      description: {
        component: `
          Кнопка для выполнения действий в интерфейсе.
          
          Поддерживает различные варианты: primary, secondary, outline.
          Может быть в состояниях: default, loading, disabled.
        `,
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
 * @param {string} label - Текст кнопки
 * @param {boolean} primary - Основной стиль кнопки
 * @param {boolean} disabled - Отключенное состояние
 * 
 * @example
 * <Button label="Submit" primary />
 */
```

### Примеры использования

```typescript
export const Examples: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '10px' }}>
      <Button label="Primary" primary />
      <Button label="Secondary" />
      <Button label="Disabled" disabled />
    </div>
  ),
};
```

## 🧪 Тестирование

### Тестирование доступности

```typescript
export const Accessibility: Story = {
  parameters: {
    a11y: {
      config: {
        rules: [
          {
            id: 'color-contrast',
            enabled: true,
          },
        ],
      },
    },
  },
};
```

### Тестирование различных состояний

```typescript
export const AllStates: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      <Button label="Default" />
      <Button label="Loading" loading />
      <Button label="Disabled" disabled />
      <Button label="Success" variant="success" />
      <Button label="Error" variant="error" />
    </div>
  ),
};
```

### Интерактивное тестирование

```typescript
import { userEvent, within } from '@storybook/testing-library';

export const Interactive: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button');
    await userEvent.click(button);
  },
};
```

## 🎨 Стилизация и темы

### Глобальные стили

В `.storybook/preview.ts`:

```typescript
import '../src/app/globals.css';
import '../src/app/layout.module.scss';
```

### Темы

```typescript
export const DarkTheme: Story = {
  parameters: {
    backgrounds: {
      default: 'dark',
    },
  },
};
```

## 🔧 Оптимизация

### Ленивая загрузка

```typescript
const meta = {
  title: 'Components/HeavyComponent',
  component: HeavyComponent,
  loaders: [
    async () => {
      const data = await fetchData();
      return { data };
    },
  ],
} satisfies Meta<typeof HeavyComponent>;
```

### Моки и стабы

```typescript
export const WithMockData: Story = {
  parameters: {
    msw: {
      handlers: [
        rest.get('/api/data', (req, res, ctx) => {
          return res(ctx.json({ data: 'mock' }));
        }),
      ],
    },
  },
};
```

## 📊 Параметры и контролы

### Настройка контролов

```typescript
const meta = {
  argTypes: {
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: 'Размер компонента',
    },
    color: {
      control: 'color',
      description: 'Цвет компонента',
    },
    disabled: {
      control: 'boolean',
      description: 'Отключенное состояние',
    },
  },
} satisfies Meta<typeof Component>;
```

### Параметры по умолчанию

```typescript
const meta = {
  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'light',
    },
  },
} satisfies Meta<typeof Component>;
```

## 🚀 Производительность

### Избегайте тяжелых вычислений

❌ **Плохо:**
```typescript
export const Heavy: Story = {
  args: {
    data: generateLargeDataset(), // Выполняется при каждой загрузке
  },
};
```

✅ **Хорошо:**
```typescript
export const Heavy: Story = {
  args: {
    data: useMemo(() => generateLargeDataset(), []),
  },
};
```

## 🔗 Связанные документы

- [[🔧 Technologies|technologies/🔧 Technologies]] - Главная страница раздела Technologies
- [[📚 Storybook|📚 Storybook]] - Обзор Storybook
- [[📦 Установка и настройка|📦 Установка и настройка]] - Установка Storybook
- [[🔧 Конфигурация|🔧 Конфигурация]] - Настройка Storybook
- [[📝 Создание Stories|📝 Создание Stories]] - Создание stories
- [[🎭 Декораторы|🎭 Декораторы]] - Работа с глобальными и локальными обёртками
- [[🚀 Запуск и деплой|🚀 Запуск и деплой]] - Деплой Storybook
