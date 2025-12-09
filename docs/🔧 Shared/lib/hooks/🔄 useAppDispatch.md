# 🔄 useAppDispatch.tsx

Типизированный хук для Redux dispatch.

## 📍 Расположение

`src/shared/lib/hooks/useAppDispatch/useAppDispatch.tsx`

## 📝 Описание

Обертка над `useDispatch` из react-redux с типизацией для `AppDispatch`.

## 🔧 Сигнатура

```typescript
export const useAppDispatch = () => useDispatch<AppDispatch>();
```

## 💡 Использование

```typescript
import { useAppDispatch } from '@/shared/lib/hooks';
import { setIsAuthenticated } from '@/features/Auth/model/auth.slice';

const MyComponent = () => {
  const dispatch = useAppDispatch();

  const handleLogin = () => {
    dispatch(setIsAuthenticated(true));
  };

  return <button onClick={handleLogin}>Login</button>;
};
```

## ✅ Преимущества

- Полная типизация действий Redux
- Автодополнение в IDE
- Проверка типов на этапе компиляции

## 🔗 Связанные документы

- [[🔧 Shared/lib/hooks|Кастомные хуки]]
- [[🔧 Shared/lib/store|Redux Store]]

