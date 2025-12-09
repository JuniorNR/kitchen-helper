# 🔀 mergeUniqueKeysObjects.ts

Функция объединения объектов с удалением undefined значений.

## 📍 Расположение

`src/shared/lib/helpers/mergeUniqueKeysObjects/mergeUniqueKeysObjects.ts`

## 📝 Описание

Объединяет два объекта, при этом удаляя поля с `undefined` значениями из результата.

## 🔧 Сигнатура

```typescript
export const mergeUniqueKeysObjects = <T extends object, U extends object>(
  obj1: T,
  obj2: U,
): T & U
```

## 💡 Использование

```typescript
import { mergeUniqueKeysObjects } from '@/shared/lib/helpers';

const obj1 = {
  name: 'John',
  age: 30,
  city: undefined
};

const obj2 = {
  email: 'john@example.com',
  phone: undefined,
  age: 25
};

const merged = mergeUniqueKeysObjects(obj1, obj2);
// Результат: { name: 'John', email: 'john@example.com', age: 25 }
// (city и phone удалены, age перезаписан)
```

### Использование для обновления состояния

```typescript
const defaultFilters = {
  category: 'all',
  price: undefined,
  sort: 'name'
};

const userFilters = {
  category: 'food',
  price: 100
};

const finalFilters = mergeUniqueKeysObjects(defaultFilters, userFilters);
// Результат: { category: 'food', sort: 'name', price: 100 }
```

## ⚠️ Особенности

- Значения из `obj2` перезаписывают значения из `obj1`
- Поля с `undefined` удаляются из результата
- Возвращает новый объект, не изменяя исходные

## 🔗 Связанные документы

- [[🔧 Shared/lib/helpers|Вспомогательные функции]]
- [[🔧 Shared/lib/helpers/🗑️ deleteFieldsWithUndefinedValues|deleteFieldsWithUndefinedValues]]

