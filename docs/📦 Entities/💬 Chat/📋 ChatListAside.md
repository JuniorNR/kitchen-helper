# 📋 ChatListAside.tsx

Боковая панель со списком чатов.

## 📍 Расположение

`src/features/Chat/ui/ChatListAside.tsx`

## 📝 Описание

Отображает список чатов с последними сообщениями и метаданными.

## 🔧 Props

```typescript
interface ChatListAsideProps {
  chats: Chat[];
  activeChatId: number | null;
  onChatClick: (id: number) => void;
}
```

## 🎨 Особенности

- Выделение активного чата
- Показ последнего сообщения
- Индикация непрочитанных сообщений
- Отображение количества участников
- Временные метки последних сообщений
- Визуальное различие своих и чужих сообщений
- Анимации при переключении
- Адаптивный дизайн

## 🔗 Связанные документы

- [[💬 Chat Feature|🎨 Features/💬 Chat]]
- [[💬 Chat Entity|📦 Entities/💬 Chat]]

