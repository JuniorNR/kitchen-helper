# 🪝 useChat.ts

Кастомный хук для работы с чатом.

## 📍 Расположение

`src/entities/chat/model/useChat.ts`

## 📝 Описание

Объединяет RTK Query хуки для работы с чатами и сообщениями в один удобный интерфейс. Предоставляет функции для отправки сообщений и получения данных.

## 🔧 Параметры

```typescript
{
  chatId: number | null;      // ID активного чата
  limit?: number;             // Лимит сообщений
  after_id?: number;          // ID сообщения для пагинации (новые)
  before_id?: number;         // ID сообщения для пагинации (старые)
}
```

## 📤 Возвращаемые значения

```typescript
{
  chats: Chat[] | undefined;                    // Список чатов
  isChatsLoading: boolean;                       // Загрузка чатов
  isSending: boolean;                           // Отправка сообщения
  messages: ChatMessage[] | undefined;          // Сообщения чата
  isMessagesLoading: boolean;                    // Загрузка сообщений
  isMessagesOldestLoading: boolean;              // Загрузка старых сообщений
  refetchMessages: () => void;                  // Перезагрузка сообщений
  sendMessageData: (content: string) => Promise<ChatMessage | null>; // Отправка
  getChatMessages: (params: ChatMessageQuery) => Promise<ChatMessage[]>; // Ленивая загрузка
}
```

## 💡 Использование

```typescript
import { useChat } from '@/entities/chat';

const ChatComponent = () => {
  const {
    chats,
    messages,
    sendMessageData,
    isSending,
    refetchMessages,
    getChatMessages
  } = useChat({ 
    chatId: activeChatId, 
    limit: 25 
  });

  const handleSend = async () => {
    const message = await sendMessageData('Hello!');
    if (message) {
      console.log('Message sent:', message);
    }
  };

  const loadOldMessages = async () => {
    const oldMessages = await getChatMessages({
      chatId: activeChatId,
      limit: 25,
      before_id: messages?.[0]?.id
    });
  };
};
```

## 🔄 Поведение

- Автоматически пропускает запрос сообщений, если `chatId` не указан
- Автоматически обновляет данные при изменении параметров
- Поддерживает refetch при монтировании, фокусе и переподключении

## 🔗 Связанные документы

- [[💬 Chat|📦 Entities/💬 Chat]]
- [[💬 Chat/📡 chat.api|chat.api.ts]]
- [[💬 Chat/📋 chat.types|chat.types.ts]]
- [[💬 Chat Feature|🎨 Features/💬 Chat]]

