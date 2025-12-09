# 🔌 baseQuery.ts

Базовый запрос для RTK Query.

## 📍 Расположение

`src/shared/lib/store/baseQuery.ts`

## 📝 Описание

Настраивает базовый запрос для всех RTK Query endpoints с автоматической обработкой авторизации и ошибок.

## 🔧 Функциональность

### Автоматическая авторизация

Добавляет токен авторизации из localStorage в заголовки запросов:

```typescript
headers.set('Authorization', `Bearer ${token}`);
headers.set('Accept', 'application/json');
```

### Обработка 401 ошибок

При получении 401 (Unauthorized):
1. Устанавливает `isAuthenticated = false` в Redux
2. Очищает токен из Redux store
3. Удаляет токен из localStorage

## 🔄 URL бэкенда

Использует `apiConfig` для определения URL:
- Development: `http://127.0.0.1:8000/api`
- Production: `https://kitchen-helper-server-production.up.railway.app/api`

## 💡 Использование

Используется автоматически во всех RTK Query APIs:

```typescript
import { baseQuery } from '@/shared/lib/store';

export const myApi = createApi({
  reducerPath: 'myApi',
  baseQuery: baseQuery, // Используется здесь
  endpoints: (builder) => ({
    // endpoints
  }),
});
```

## 🔐 Безопасность

- Токен берется из localStorage только на клиенте (`typeof window !== 'undefined'`)
- Автоматическая очистка при 401 ошибке
- Безопасная обработка ошибок доступа к localStorage

## 🔗 Связанные документы

- [[🔧 Shared/lib/store|Redux Store]]
- [[⚙️ Конфигурация/🌐 api.config|api.config.ts]]
- [[🔐 Auth Feature|🎨 Features/🔐 Auth]]

