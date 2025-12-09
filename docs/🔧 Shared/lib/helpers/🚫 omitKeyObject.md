# 🚫 omitKeyObject.ts

Функция исключения ключа из объекта.

## 📍 Расположение

`src/shared/lib/helpers/omitKeyObject/omitKeyObject.ts`

## 📝 Описание

Создает новый объект без указанного ключа.

## 🔧 Сигнатура

```typescript
export const omitKeyObject = <T extends object, U extends keyof T & string>(
  key: U,
  object: T,
): Omit<T, U>
```

## 💡 Использование

```typescript
import { omitKeyObject } from '@/shared/lib/helpers';

const user = {
  id: 1,
  name: 'John',
  email: 'john@example.com',
  password: 'secret'
};

// Исключить пароль перед отправкой
const safeUser = omitKeyObject('password', user);
// Результат: { id: 1, name: 'John', email: 'john@example.com' }
```

### Исключение нескольких ключей

```typescript
let result = omitKeyObject('password', user);
result = omitKeyObject('id', result);
// Результат: { name: 'John', email: 'john@example.com' }
```

### Использование в формах

```typescript
const formData = {
  name: 'John',
  email: 'john@example.com',
  _csrf: 'token123',
  _method: 'POST'
};

// Удалить служебные поля
const cleanData = omitKeyObject('_csrf', omitKeyObject('_method', formData));
```

## ⚠️ Особенности

- Не изменяет исходный объект
- Возвращает новый объект
- Типизирован с TypeScript
- Работает только с одним ключом за раз

## 🔗 Связанные документы

- [[🔧 Shared/lib/helpers|Вспомогательные функции]]

