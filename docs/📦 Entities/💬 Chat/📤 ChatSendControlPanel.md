# 📤 ChatSendControlPanel.tsx

Панель для отправки сообщений.

## 📍 Расположение

`src/features/Chat/ui/ChatSendControlPanel.tsx`

## 📝 Описание

Компонент для ввода и отправки сообщений в чат.

## 🔧 Props

```typescript
interface ChatSendControlPanelProps {
  message: string;
  setMessage: Dispatch<SetStateAction<string>>;
  sendMessage: (content: string) => Promise<ChatMessage | null>;
  isSending: boolean;
}
```

## 🎨 Особенности

- Поле ввода сообщения
- Кнопка отправки с иконкой
- Индикация загрузки отправки
- Автоматическая очистка поля после отправки
- Блокировка при отправке

## 🔗 Связанные документы

- [[💬 Chat Feature|🎨 Features/💬 Chat]]
- [[💬 Chat Entity|📦 Entities/💬 Chat]]

