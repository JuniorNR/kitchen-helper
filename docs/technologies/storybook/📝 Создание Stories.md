# 📝 Создание Stories

## Базовый пример

```typescript
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

const meta = {
  title: 'Example/Button',
  component: Button,
  tags: ['autodocs'],
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    label: 'Button',
  },
};
```

## Типы Stories

- **Default export** - метаданные компонента
- **Named exports** - конкретные варианты компонента

