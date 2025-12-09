# 🪟 Modal.tsx

Компонент модального окна с подтверждением.

## 📍 Расположение

`src/shared/ui/Modal/ui/Modal.tsx`

## 📝 Описание

Модальное окно с заголовком, описанием, предупреждениями и кнопками действий.

## 🔧 Props

```typescript
interface ModalProps {
  title: string;
  subtitle?: string;
  accentItemTitle?: string;
  warningFields?: string[];
  description: string;
  onConfirm: () => void;
  TriggerComponent?: React.ComponentType<{ onPress: () => void }>;
  isLoading?: boolean;
  confirmButtonText?: string;
  confirmButtonColor?: ButtonProps['color'];
  confirmButtonVariant?: ButtonProps['variant'];
  confirmButtonStartContent?: React.ReactNode;
}
```

## 💡 Использование

### Базовое использование

```typescript
import { Modal } from '@/shared/ui';

<Modal
  title="Delete Item"
  description="Are you sure you want to delete this item?"
  onConfirm={handleDelete}
  TriggerComponent={({ onPress }) => (
    <Button onPress={onPress}>Delete</Button>
  )}
/>
```

### С предупреждениями

```typescript
<Modal
  title="Delete Recipe"
  description="This action cannot be undone"
  warningFields={['This recipe has 5 ingredients', 'All steps will be lost']}
  onConfirm={handleDelete}
/>
```

### С кастомной кнопкой

```typescript
<Modal
  title="Confirm Action"
  description="Please confirm"
  confirmButtonText="Yes, I'm sure"
  confirmButtonColor="danger"
  confirmButtonVariant="solid"
  onConfirm={handleConfirm}
/>
```

## 🎨 Особенности

- Автоматическое управление открытием/закрытием
- Поддержка кастомного триггера
- Предупреждающие поля с иконками
- Загрузочное состояние кнопки
- Локализация текстов

## 🔗 Связанные документы

- [[🔧 Shared/ui|UI компоненты]]

