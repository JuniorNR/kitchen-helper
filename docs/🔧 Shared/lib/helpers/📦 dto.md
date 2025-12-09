# 📦 dto.ts

Функция преобразования данных между форматами сервера (snake_case) и клиента (camelCase).

## 📍 Расположение

`src/shared/lib/helpers/dto/dto.ts`

## 📝 Описание

Универсальная функция для преобразования объектов и массивов между форматами:
- **toClient**: snake_case → camelCase (сервер → клиент)
- **toServer**: camelCase → snake_case (клиент → сервер)

## 🔧 Сигнатура

```typescript
export const dto = <T extends object | object[], U extends object>(
  type: 'toServer' | 'toClient',
  data: T,
): U
```

## 💡 Использование

### Преобразование в клиентский формат

```typescript
import { dto } from '@/shared/lib/helpers';

const serverData = {
  user_id: 1,
  created_at: '2024-01-01',
  user_name: 'John'
};

const clientData = dto<typeof serverData, ClientUser>('toClient', serverData);
// Результат: { userId: 1, createdAt: '2024-01-01', userName: 'John' }
```

### Преобразование в серверный формат

```typescript
const clientData = {
  userId: 1,
  createdAt: '2024-01-01',
  userName: 'John'
};

const serverData = dto<typeof clientData, ServerUser>('toServer', clientData);
// Результат: { user_id: 1, created_at: '2024-01-01', user_name: 'John' }
```

### Работа с массивами

```typescript
const serverArray = [
  { user_id: 1, user_name: 'John' },
  { user_id: 2, user_name: 'Jane' }
];

const clientArray = dto<typeof serverArray, ClientUser[]>('toClient', serverArray);
// Результат: [{ userId: 1, userName: 'John' }, { userId: 2, userName: 'Jane' }]
```

### Рекурсивное преобразование

Функция автоматически обрабатывает вложенные объекты:

```typescript
const serverData = {
  user_id: 1,
  profile: {
    first_name: 'John',
    last_name: 'Doe'
  }
};

const clientData = dto('toClient', serverData);
// Результат: { userId: 1, profile: { firstName: 'John', lastName: 'Doe' } }
```

## 🔄 Алгоритм преобразования

### toClient (snake_case → camelCase)
1. Разбивает ключ по `_`
2. Первая часть остается в нижнем регистре
3. Остальные части: первая буква в верхнем регистре, остальные в нижнем
4. Объединяет части

### toServer (camelCase → snake_case)
1. Разбивает ключ по границе между строчными и заглавными буквами
2. Объединяет части через `_`
3. Приводит к нижнему регистру

## ⚠️ Особенности

- Обрабатывает `null` и `undefined`
- Поддерживает массивы
- Рекурсивно обрабатывает вложенные объекты
- Сохраняет массивы как массивы (не преобразует ключи)

## 🔗 Связанные документы

- [[🔧 Shared/lib/helpers|Вспомогательные функции]]
- [[📦 Entities|📦 Entities]]

