# 📅 serializeDate.ts

Функция сериализации даты в строку ISO.

## 📍 Расположение

`src/shared/lib/helpers/serializeDate/serializeDate.ts`

## 📝 Описание

Преобразует Date объект или строку в ISO строку для отправки на сервер.

## 🔧 Сигнатура

```typescript
export const serializeDate = (
  d?: string | Date
): string | undefined
```

## 💡 Использование

```typescript
import { serializeDate } from '@/shared/lib/helpers';

// Из Date объекта
const date = new Date(2024, 11, 25);
const isoString = serializeDate(date);
// Результат: "2024-12-25T00:00:00.000Z"

// Из строки (возвращает как есть)
const dateString = '2024-12-25';
const result = serializeDate(dateString);
// Результат: "2024-12-25"

// undefined если передано undefined
const result2 = serializeDate(undefined);
// Результат: undefined
```

## 🔄 Обратное преобразование

Используется вместе с `parseDate` для преобразования дат между форматами:

```typescript
import { parseDate, serializeDate } from '@/shared/lib/helpers';

// Парсинг из пользовательского формата
const userDate = parseDate('25.12.2024', 'ru');

// Сериализация для отправки на сервер
if (userDate) {
  const serverDate = serializeDate(userDate);
  // Отправка на сервер
}
```

## ⚠️ Особенности

- Если передана строка, возвращает её без изменений
- Если передан Date, преобразует в ISO строку через `toISOString()`
- Возвращает `undefined` если передан `undefined`

## 🔗 Связанные документы

- [[🔧 Shared/lib/helpers|Вспомогательные функции]]
- [[🔧 Shared/lib/helpers/parseDate|parseDate]]

