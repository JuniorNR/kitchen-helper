# 📡 echo.config.ts

Конфигурация Laravel Echo для real-time коммуникации.

## 📍 Расположение

`src/shared/lib/configs/echo/echo.config.ts`

## 📝 Описание

Инициализирует Laravel Echo с настройками для WebSocket соединения через Pusher.

## 🔧 Функции

### `initEcho(authToken: string)`

Инициализирует Echo с токеном авторизации.

**Параметры**:
- `authToken` - токен авторизации пользователя

**Настройки**:
- Broadcaster: `pusher`
- Кластер: из переменной окружения (по умолчанию 'eu')
- Force TLS: `true`
- Auth endpoint: `${API_URL}/broadcasting/auth`
- Transports: `['ws', 'wss']`

## 🌍 Переменные окружения

- `NEXT_PUBLIC_APP_BACKEND_URL` - URL бэкенда
- `NEXT_PUBLIC_PUSHER_APP_KEY` - ключ Pusher
- `NEXT_PUBLIC_PUSHER_CLUSTER` - кластер Pusher (по умолчанию 'eu')

## 💡 Использование

```typescript
import { initEcho } from '@/shared/lib/configs';

initEcho(authToken);
```

## 🔗 Связанные документы

- [[📡 EchoProvider|EchoProvider]]
- [[💬 Chat Feature|🎨 Features/💬 Chat]]

