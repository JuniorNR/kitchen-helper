# 📡 chat.api.ts

RTK Query API для работы с чатами и сообщениями.

## 📍 Расположение

`src/entities/chat/model/chat.api.ts`

## 📝 Описание

Определяет endpoints для работы с чатами через RTK Query. Использует DTO преобразование для конвертации данных между форматами сервера и клиента.

## 🔧 Экспорты

### `chatApi`

RTK Query API instance с следующими endpoints:

#### `getChats`
- **Метод**: GET
- **URL**: `/chats`
- **Возвращает**: `Chat[]`
- **Описание**: Получение списка всех чатов пользователя

#### `getChatMessages`
- **Метод**: GET
- **URL**: `/chats/:chatId/messages`
- **Параметры**: `{ chatId, limit, before_id, after_id }`
- **Возвращает**: `ChatMessage[]`
- **Описание**: Получение сообщений чата с пагинацией
- **Tags**: `['ChatMessages']`

#### `sendMessage`
- **Метод**: POST
- **URL**: `/chats/:chatId/messages`
- **Тело**: `{ content: string }`
- **Возвращает**: `ChatMessage`
- **Описание**: Отправка нового сообщения в чат

### Хуки

- `useGetChatsQuery()` - получение списка чатов
- `useGetChatMessagesQuery(params)` - получение сообщений
- `useSendMessageMutation()` - отправка сообщения
- `useLazyGetChatMessagesQuery()` - ленивая загрузка сообщений

## 💡 Использование

```typescript
import { useGetChatsQuery, useSendMessageMutation } from '@/entities/chat';

// Получение чатов
const { data: chats, isLoading } = useGetChatsQuery();

// Отправка сообщения
const [sendMessage] = useSendMessageMutation();
await sendMessage({ chatId: 1, content: 'Hello!' });
```

## 🔄 DTO Преобразование

Все данные автоматически преобразуются из snake_case (сервер) в camelCase (клиент):

```typescript
transformResponse: (response: ChatMessageDTO[]) => {
  return dto<ChatMessageDTO[], ChatMessage[]>('toClient', response);
}
```

## 🔗 Связанные документы

- [[FrontEnd/Kitchen-helper/docs/📦 Entities/💬 Chat|📦 Entities/💬 Chat]]
- [[📋 chat.types|chat.types.ts]]
- [[🪝 useChat|useChat.ts]]
- [[🔧 Shared/lib/helpers/dto|DTO Helper]]

