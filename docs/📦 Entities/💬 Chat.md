# 💬 Chat Entity

Сущность чата для обмена сообщениями между пользователями.

## 📍 Расположение

`src/entities/chat/`

## 📂 Структура

```
chat/
├── index.ts                # Публичный API
└── model/
    ├── chat.api.ts         # RTK Query API
    ├── chat.types.ts       # TypeScript типы
    └── useChat.ts          # Хук для работы с чатом
```

## 📄 Файлы

### [[💬 Chat/📡 chat.api|chat.api.ts]]

RTK Query API для работы с чатами и сообщениями.

**Экспорты**:
- `chatApi` - RTK Query API instance
- `useGetChatsQuery` - хук для получения списка чатов
- `useGetChatMessagesQuery` - хук для получения сообщений чата
- `useSendMessageMutation` - хук для отправки сообщения
- `useLazyGetChatMessagesQuery` - ленивый хук для получения сообщений

**Endpoints**:
- `getChats` - GET `/chats` - получение списка чатов
- `getChatMessages` - GET `/chats/:chatId/messages` - получение сообщений
- `sendMessage` - POST `/chats/:chatId/messages` - отправка сообщения

**Связанные документы**:
- [[💬 Chat/📋 chat.types|chat.types.ts]]
- [[💬 Chat/🪝 useChat|useChat.ts]]

---

### [[💬 Chat/📋 chat.types|chat.types.ts]]

TypeScript типы для чата и сообщений.

**Типы**:
- `ChatDTO` - формат чата с сервера (snake_case)
- `Chat` - формат чата на клиенте (camelCase)
- `ChatUserDTO` / `ChatUser` - пользователь чата
- `ChatMessageDTO` / `ChatMessage` - сообщение чата
- `ChatMessageQuery` - параметры запроса сообщений
- `SendMessageQuery` - параметры отправки сообщения

**Связанные документы**:
- [[💬 Chat/📡 chat.api|chat.api.ts]]
- [[💬 Chat/🪝 useChat|useChat.ts]]

---

### [[💬 Chat/🪝 useChat|useChat.ts]]

Кастомный хук для работы с чатом.

**Параметры**:
```typescript
{
  chatId: number | null;
  limit?: number;
  after_id?: number;
  before_id?: number;
}
```

**Возвращает**:
```typescript
{
  chats: Chat[] | undefined;
  isChatsLoading: boolean;
  isSending: boolean;
  messages: ChatMessage[] | undefined;
  isMessagesLoading: boolean;
  isMessagesOldestLoading: boolean;
  refetchMessages: () => void;
  sendMessageData: (content: string) => Promise<ChatMessage | null>;
  getChatMessages: (params: ChatMessageQuery) => Promise<ChatMessage[]>;
}
```

**Использование**:
```typescript
const {
  chats,
  messages,
  sendMessageData,
  isSending
} = useChat({ chatId: 1, limit: 25 });
```

**Связанные документы**:
- [[💬 Chat/📡 chat.api|chat.api.ts]]
- [[💬 Chat Feature|🎨 Features/💬 Chat]]

---

## 🔗 Связанные документы

- [[📦 Entities|📦 Entities]]
- [[💬 Chat Feature|🎨 Features/💬 Chat]]
- [[🔧 Shared/lib/helpers/dto|DTO Helper]]
- [[🔧 Shared/lib/store|Redux Store]]

