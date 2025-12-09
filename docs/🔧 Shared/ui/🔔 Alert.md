# 🔔 Alert.tsx

Компонент уведомления с анимацией.

## 📍 Расположение

`src/shared/ui/Alert/ui/Alert.tsx`

## 📝 Описание

Отображает уведомление с иконкой, заголовком и описанием. Поддерживает различные статусы и анимации.

## 🔧 Props

```typescript
interface AlertProps {
  title: string;
  description: string;
  status: 'success' | 'danger' | 'warning' | 'info' | 'default';
  className?: string;
}
```

## 💡 Использование

```typescript
import { Alert } from '@/shared/ui';

<Alert
  title="Success"
  description="Operation completed successfully"
  status="success"
/>
```

### Различные статусы

```typescript
<Alert status="success" title="Success" description="..." />
<Alert status="danger" title="Error" description="..." />
<Alert status="warning" title="Warning" description="..." />
<Alert status="info" title="Info" description="..." />
<Alert status="default" title="Default" description="..." />
```

## 🎨 Стили статусов

- **success** - зеленый (emerald)
- **danger** - красный (danger)
- **warning** - желтый (amber)
- **info** - синий (sky)
- **default** - серый (slate)

## ✨ Анимации

- Появление с масштабированием и движением
- Вращение иконки при появлении
- Плавные переходы цветов

## 🔗 Связанные документы

- [[🔧 Shared/ui|UI компоненты]]
- [[🔔 Alert Feature|🎨 Features/🔔 Alert]]

