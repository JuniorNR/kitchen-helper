# 🌐 api.config.ts

Конфигурационный файл для работы с API бэкенда.

## 📍 Расположение

`src/configs/api.config.ts`

## 📝 Описание

Определяет URL-адреса бэкенд сервера для разных окружений (development и production).

## 🔧 Экспорты

### `apiConfig`

Объект конфигурации API со следующими свойствами:

```typescript
{
  isProd: boolean;              // Флаг продакшн окружения
  APP_BACKEND_URL: string;      // URL для разработки
  APP_BACKEND_URL_PROD: string; // URL для продакшна
}
```

## 📊 Значения по умолчанию

- `isProd`: `false`
- `APP_BACKEND_URL`: `'http://127.0.0.1:8000'`
- `APP_BACKEND_URL_PROD`: `'https://kitchen-helper-server-production.up.railway.app'`

## 💡 Использование

```typescript
import { apiConfig } from '@/configs';

// Получение URL в зависимости от окружения
const backendUrl = apiConfig.isProd 
  ? apiConfig.APP_BACKEND_URL_PROD 
  : apiConfig.APP_BACKEND_URL;

// Использование в запросах
fetch(`${backendUrl}/api/endpoint`);
```

## 🔗 Связанные документы

- [[⚙️ Конфигурация|⚙️ Конфигурация]]
- [[🔧 Shared/lib/store/baseQuery|baseQuery]]
- [[🔧 Shared/lib/configs/echo|Echo конфигурация]]

