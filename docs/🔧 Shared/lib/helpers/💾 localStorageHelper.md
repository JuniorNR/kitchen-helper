# 💾 localStorageHelper.ts

Хелпер для работы с localStorage.

## 📍 Расположение

`src/shared/lib/helpers/localStorageHelper/localStorageHelper.ts`

## 📝 Описание

Удобная обертка над localStorage с поддержкой JSON сериализации/десериализации.

## 🔧 Сигнатура

```typescript
export const localStorageHelper = <T extends string | object>(
  key: string
) => {
  item: T;
  storageSetItem: (value: Partial<T>) => void;
  storageRemoveItem: () => void;
  storageClear: () => void;
}
```

## 💡 Использование

### Базовое использование

```typescript
import { localStorageHelper } from '@/shared/lib/helpers';

// Создание хелпера для ключа
const chatHelper = localStorageHelper<string>('active_chat_id');

// Получение значения
const chatId = chatHelper.item; // string или null

// Установка значения
chatHelper.storageSetItem('123');

// Удаление значения
chatHelper.storageRemoveItem();

// Очистка всего localStorage
chatHelper.storageClear();
```

### Работа с объектами

```typescript
interface UserPreferences {
  theme: 'light' | 'dark';
  language: 'en' | 'ru';
}

const prefsHelper = localStorageHelper<UserPreferences>('user_preferences');

// Установка объекта (автоматически сериализуется в JSON)
prefsHelper.storageSetItem({
  theme: 'dark',
  language: 'ru'
});

// Получение объекта (автоматически десериализуется)
const prefs = prefsHelper.item; // UserPreferences или {}
```

### Обновление части объекта

```typescript
// Можно обновить только часть объекта
prefsHelper.storageSetItem({ theme: 'light' }); // language останется прежним
```

## ⚠️ Особенности

- Автоматическая JSON сериализация/десериализация
- Безопасная обработка ошибок парсинга
- Возвращает пустой объект `{}` если значение не найдено или невалидно
- Возвращает `null` для строковых значений, если не найдено

## 🔗 Связанные документы

- [[🔧 Shared/lib/helpers|Вспомогательные функции]]
- [[💬 Chat Feature|🎨 Features/💬 Chat]]

