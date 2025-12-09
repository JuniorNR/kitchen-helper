# ✂️ cutStringWithSeparator.ts

Функция обрезки строки с разделителем.

## 📍 Расположение

`src/shared/lib/helpers/cutStringWithSeparator/cutStringWithSeparator.ts`

## 📝 Описание

Обрезает строку до указанной длины и добавляет разделитель в конце.

## 🔧 Сигнатура

```typescript
export const cutStringWithSeparator = (
  string: string,
  countSlice: number,
  separator?: string,
): string
```

## 💡 Использование

```typescript
import { cutStringWithSeparator } from '@/shared/lib/helpers';

// С разделителем по умолчанию
const result = cutStringWithSeparator('Hello World', 5);
// Результат: "Hello.."

// С кастомным разделителем
const result2 = cutStringWithSeparator('Hello World', 5, '...');
// Результат: "Hello..."

// Для длинных текстов
const longText = 'This is a very long text that needs to be truncated';
const truncated = cutStringWithSeparator(longText, 20);
// Результат: "This is a very long .."
```

## ⚙️ Параметры

- `string` - исходная строка
- `countSlice` - количество символов для обрезки
- `separator` - разделитель (по умолчанию `'..'`)

## 🔗 Связанные документы

- [[🔧 Shared/lib/helpers|Вспомогательные функции]]
- [[🔧 Shared/lib/helpers/🎭 customizeString|customizeString]]

