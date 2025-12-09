# 📝 Typography.tsx

Компонент типографики с поддержкой различных элементов.

## 📍 Расположение

`src/shared/ui/Typography/ui/Typography.tsx`

## 📝 Описание

Универсальный компонент для отображения текста с поддержкой различных HTML элементов, обрезки текста и tooltip.

## 🔧 Props

```typescript
interface TypographyProps {
  children: string;
  component?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span';
  className?: string;
  classNameComponent?: string;
  tooltip?: boolean;
  maxLength?: number | null;
  lineClamp?: number | null;
  hideLargeText?: boolean;
  isSecond?: boolean;
}
```

## 💡 Использование

### Базовое использование

```typescript
import { Typography } from '@/shared/ui';

<Typography component="h1">Заголовок</Typography>
<Typography component="p">Обычный текст</Typography>
```

### С обрезкой текста

```typescript
<Typography maxLength={50}>
  Очень длинный текст который будет обрезан
</Typography>
```

### С tooltip

```typescript
<Typography tooltip maxLength={30}>
  Длинный текст с подсказкой при наведении
</Typography>
```

### С ограничением строк

```typescript
<Typography lineClamp={3}>
  Многострочный текст который будет ограничен тремя строками
</Typography>
```

## 🎨 Элементы

- **h1-h6** - заголовки разных уровней
- **p** - параграф (по умолчанию)
- **span** - инлайн элемент

## 🔗 Связанные документы

- [[🔧 Shared/ui|UI компоненты]]

