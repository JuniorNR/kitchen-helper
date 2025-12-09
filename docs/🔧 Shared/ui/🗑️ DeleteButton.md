# 🗑️ DeleteButton.tsx

Компонент кнопки удаления.

## 📍 Расположение

`src/shared/ui/DeleteButton/ui/DeleteButton.tsx`

## 📝 Описание

Специализированная кнопка для удаления элементов с иконкой корзины.

## 🔧 Props

```typescript
interface DeleteButtonProps {
  ariaLabel?: string;
  label?: string; // Текст рядом с иконкой
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  isDisabled?: boolean;
  className?: string;
  onPress?: () => void;
}
```

## 💡 Использование

### Только иконка

```typescript
import { DeleteButton } from '@/shared/ui';

<DeleteButton
  ariaLabel="Delete item"
  onPress={handleDelete}
  size="md"
/>
```

### С текстом

```typescript
<DeleteButton
  label="Delete"
  onPress={handleDelete}
  size="lg"
/>
```

## 🎨 Особенности

- Автоматическое определение режима (иконка или с текстом)
- Цвет danger (красный)
- Вариант flat
- Поддержка состояний загрузки и отключения
- Доступность (aria-label)

## 🔗 Связанные документы

- [[🔧 Shared/ui|UI компоненты]]

