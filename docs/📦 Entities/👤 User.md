# 👤 User Entity

Сущность пользователя приложения.

## 📍 Расположение

`src/entities/user/`

## 📂 Структура

```
user/
├── index.ts                # Публичный API
└── model/
    ├── user.api.ts         # RTK Query API
    ├── user.types.ts       # TypeScript типы
    └── useUser.ts          # Хук для работы с пользователями
```

## 📄 Файлы

### [[📡 user.api|user.api.ts]]

RTK Query API для работы с пользователями.

**Endpoints**:
- `getUser` - GET `/user` - получение текущего пользователя
- `updateUser` - PATCH `/user` - обновление данных пользователя

**Особенности**:
- Автоматически обновляет статус аутентификации при получении пользователя
- Показывает уведомления при успехе/ошибке обновления

**Связанные документы**:
- [[📋 user.types|user.types.ts]]
- [[🪝 useUser|useUser.ts]]

---

### [[📋 user.types|user.types.ts]]

TypeScript типы для пользователей.

**Типы**:
- `User` - клиентский тип пользователя
- `UserDTO` - серверный тип пользователя

**Связанные документы**:
- [[📡 user.api|user.api.ts]]
- [[🪝 useUser|useUser.ts]]

---

### [[🪝 useUser|useUser.ts]]

Кастомный хук для работы с пользователями.

**Параметры**: нет

**Возвращает**:
```typescript
{
  user: User | undefined;
  isUserLoading: boolean;
  updateUserData: (data: UserSettingsFormData) => Promise<User | null>;
  isUpdateUserLoading: boolean;
}
```

**Использование**:
```typescript
const { user, updateUserData, isUserLoading } = useUser();
```

**Связанные документы**:
- [[📡 user.api|user.api.ts]]
- [[⚙️ UserSettings Feature|🎨 Features/⚙️ UserSettings]]

---

## 🔗 Связанные документы

- [[📦 Entities|📦 Entities]]
- [[🔐 Auth Feature|🎨 Features/🔐 Auth]]
- [[⚙️ UserSettings Feature|🎨 Features/⚙️ UserSettings]]

