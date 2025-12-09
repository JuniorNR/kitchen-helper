# 📋 chat.types.ts

TypeScript типы для чата и сообщений.

## 📍 Расположение

`src/entities/chat/model/chat.types.ts`

## 📝 Описание

Определяет все TypeScript интерфейсы для работы с чатами, пользователями чатов и сообщениями. Включает как DTO типы (для сервера), так и клиентские типы.

## 🔧 Типы

### DTO типы (серверный формат - snake_case)

#### `ChatDTO`
```typescript
{
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
  last_message_created_at: string;
  users_count: number;
  users: ChatUserDTO[];
  last_message: ChatMessageDTO;
  creator: ChatUserDTO;
}
```

#### `ChatUserDTO`
```typescript
{
  id: number;
  name: string;
  role: string;
}
```

#### `ChatMessageDTO`
```typescript
{
  id: number;
  chat_id: number;
  content: string;
  created_at: string;
  updated_at: string;
  user: ChatUserDTO;
}
```

### Клиентские типы (camelCase)

#### `Chat`
```typescript
{
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
  lastMessageCreatedAt: string;
  usersCount: number;
  users: ChatUser[];
  lastMessage: ChatMessage;
  creator: ChatUser;
}
```

#### `ChatUser`
```typescript
{
  id: number;
  name: string;
  role: string;
}
```

#### `ChatMessage`
```typescript
{
  id: number;
  chatId: number;
  content: string;
  createdAt: string;
  updatedAt: string;
  user: ChatUser;
}
```

### Query типы

#### `ChatMessageQuery`
```typescript
{
  chatId: number | null;
  limit?: number;
  after_id?: number;
  before_id?: number;
}
```

#### `SendMessageQuery`
```typescript
{
  chatId: number | null;
  content: string;
}
```

## 🔄 Преобразование

Типы автоматически преобразуются функцией `dto`:
- `toClient`: DTO → Client (snake_case → camelCase)
- `toServer`: Client → DTO (camelCase → snake_case)

## 🔗 Связанные документы

- [[💬 Chat|📦 Entities/💬 Chat]]
- [[💬 Chat/📡 chat.api|chat.api.ts]]
- [[💬 Chat/🪝 useChat|useChat.ts]]
- [[🔧 Shared/lib/helpers/dto|DTO Helper]]

