# 🪝 useUser.ts

Кастомный хук для работы с пользователями.

## 📍 Расположение

`src/entities/user/model/useUser.ts`

## 📝 Описание

Объединяет RTK Query хуки для работы с пользователями в один удобный интерфейс.

## 🔧 Параметры

Нет параметров.

## 📤 Возвращаемые значения

```typescript
{
  user: User | undefined;
  isUserLoading: boolean;
  updateUserData: (data: UserSettingsFormData) => Promise<User | null>;
  isUpdateUserLoading: boolean;
}
```

## 💡 Использование

```typescript
import { useUser } from '@/entities/user';

const { 
  user, 
  isUserLoading, 
  updateUserData 
} = useUser();

// Обновление данных
await updateUserData({
  name: 'New Name',
  email: 'new@example.com'
});
```

## 🔄 Особенности

- Автоматическая загрузка текущего пользователя
- Обработка ошибок
- Состояния загрузки

## 🔗 Связанные документы

- [[👤 User|📦 Entities/👤 User]]
- [[👤 User/📡 user.api|user.api.ts]]
- [[⚙️ UserSettings Feature|🎨 Features/⚙️ UserSettings]]

