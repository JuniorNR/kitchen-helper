# 🔄 useAppSelector.tsx

Типизированный хук для Redux selector.

## 📍 Расположение

`src/shared/lib/hooks/useAppSelector/useAppSelector.tsx`

## 📝 Описание

Обертка над `useSelector` из react-redux с типизацией для `RootState`.

## 🔧 Сигнатура

```typescript
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
```

## 💡 Использование

```typescript
import { useAppSelector } from '@/shared/lib/hooks';

const MyComponent = () => {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const user = useAppSelector((state) => state.user);

  return (
    <div>
      {isAuthenticated ? `Logged in as ${user.name}` : 'Not logged in'}
    </div>
  );
};
```

### С селекторами

```typescript
const selectAuth = (state: RootState) => state.auth;
const selectUser = (state: RootState) => state.user;

const MyComponent = () => {
  const auth = useAppSelector(selectAuth);
  const user = useAppSelector(selectUser);
};
```

## ✅ Преимущества

- Полная типизация состояния Redux
- Автодополнение в IDE
- Проверка типов на этапе компиляции

## 🔗 Связанные документы

- [[🔧 Shared/lib/hooks|Кастомные хуки]]
- [[🔧 Shared/lib/store|Redux Store]]

