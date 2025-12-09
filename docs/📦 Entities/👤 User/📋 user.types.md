# 📋 user.types.ts

TypeScript типы для пользователей.

## 📍 Расположение

`src/entities/user/model/user.types.ts`

## 📝 Описание

Определяет все TypeScript интерфейсы для работы с пользователями.

## 🔧 Типы

### `User`

Клиентский тип пользователя (camelCase):

```typescript
{
  id: number;
  name: string;
  email: string;
  emailVerifiedAt: string;
  createdAt: string;
  updatedAt: string;
}
```

### `UserDTO`

Серверный тип пользователя (snake_case):

```typescript
{
  id: number;
  name: string;
  email: string;
  email_verified_at: string;
  created_at: string;
  updated_at: string;
}
```

## 🔗 Связанные документы

- [[👤 User|📦 Entities/👤 User]]
- [[👤 User/📡 user.api|user.api.ts]]
- [[👤 User/🪝 useUser|useUser.ts]]

