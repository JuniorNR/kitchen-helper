# 🗑️ deleteFieldsWithUndefinedValues.ts

Функция удаления полей с undefined значениями из объекта.

## 📍 Расположение

`src/shared/lib/helpers/deleteFieldsWithUndefinedValues/deleteFieldsWithUndefinedValues.ts`

## 📝 Описание

Создает новый объект без полей, значения которых равны `undefined`.

## 🔧 Сигнатура

```typescript
export const deleteFieldsWithUndefinedValues = <T extends object>(
  object: T,
): Partial<T>
```

## 💡 Использование

```typescript
import { deleteFieldsWithUndefinedValues } from '@/shared/lib/helpers';

const obj = {
  name: 'John',
  age: undefined,
  email: 'john@example.com',
  phone: undefined
};

const cleaned = deleteFieldsWithUndefinedValues(obj);
// Результат: { name: 'John', email: 'john@example.com' }
```

### Использование в фильтрах

```typescript
const filters = {
  category: 'food',
  price: undefined,
  rating: 5,
  tags: undefined
};

const cleanFilters = deleteFieldsWithUndefinedValues(filters);
// Отправка на сервер только определенных полей
```

## ⚠️ Особенности

- Не изменяет исходный объект
- Возвращает новый объект
- Удаляет только поля со значением `undefined`
- Поля с `null` остаются

## 🔗 Связанные документы

- [[🔧 Shared/lib/helpers|Вспомогательные функции]]

