# 🎨 classNames.ts

Функция для объединения CSS классов с модификаторами.

## 📍 Расположение

`src/shared/lib/helpers/classNames/classNames.ts`

## 📝 Описание

Удобная функция для динамического формирования CSS классов с поддержкой модификаторов и дополнительных классов.

## 🔧 Сигнатура

```typescript
export const classNames = (
  classes: string,
  modifiers?: Record<string, boolean | string>,
  additional?: string[],
): string
```

## 💡 Использование

### Базовое использование

```typescript
import { classNames } from '@/shared/lib/helpers';

const className = classNames('button');
// Результат: "button"
```

### С модификаторами (boolean)

```typescript
const className = classNames('button', {
  active: true,
  disabled: false,
  large: true
});
// Результат: "button active large"
```

### С модификаторами (string)

```typescript
const className = classNames('button', {
  size: 'large',
  variant: 'primary'
});
// Результат: "button large primary"
```

### С дополнительными классами

```typescript
const className = classNames(
  'button',
  { active: true },
  ['custom-class', 'another-class']
);
// Результат: "button active custom-class another-class"
```

### Комплексный пример

```typescript
const className = classNames(
  'card',
  {
    'card-hover': isHovered,
    'card-selected': isSelected,
    variant: 'outlined'
  },
  ['transition-all', 'duration-300']
);
```

## ⚠️ Особенности

- Модификаторы с `false` значениями игнорируются
- Пустые строки в модификаторах игнорируются
- Дополнительные классы объединяются через пробел
- Результат автоматически обрезается от лишних пробелов

## 🔗 Связанные документы

- [[🔧 Shared/lib/helpers|Вспомогательные функции]]

