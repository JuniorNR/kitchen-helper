# 🔔 Alerts.tsx

Компонент контейнера уведомлений.

## 📍 Расположение

`src/shared/ui/Alerts/ui/Alerts.tsx`

## 📝 Описание

Контейнер для отображения множественных уведомлений с автоматическим закрытием.

## 🔧 Props

```typescript
interface AlertsProps {
  alerts: AlertType[];
  autoCloseMS?: number;
  className?: string;
}
```

## 💡 Использование

```typescript
import { Alerts } from '@/shared/ui';

<Alerts
  alerts={alerts}
  autoCloseMS={5000}
/>
```

## 🎨 Особенности

- Автоматическое закрытие через указанное время
- Анимации появления/исчезновения
- Фиксированное положение (правый нижний угол)
- Преобразование статусов для HeroUI Alert
- Локализация заголовков и описаний
- Очистка таймеров при размонтировании

## ⚙️ Статусы

- `success` → `success`
- `danger` → `danger`
- `warning` → `warning`
- `info` → `primary`
- `default` → `default`

## 🔗 Связанные документы

- [[🔧 Shared/ui|UI компоненты]]
- [[FrontEnd/Kitchen-helper/docs/🔧 Shared/ui/🔔 Alert|Alert]]
- [[🔔 Alert Feature|🎨 Features/🔔 Alert]]

