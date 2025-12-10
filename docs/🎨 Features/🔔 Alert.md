# 🔔 Alert Feature

Система уведомлений.

## 📍 Расположение

`src/features/Alert/`

## 📂 Структура

```
Alert/
├── index.ts
└── model/
    └── alert.slice.ts
```

## 🗄️ Redux

### `alert.slice.ts`

Redux slice для управления уведомлениями.

**Actions**:
- `addAlert` - добавление уведомления
- `removeAlert` - удаление уведомления

**State**:
```typescript
{
  alerts: Array<{
    id: string;
    status: 'success' | 'danger' | 'warning' | 'info';
    title: string;
    description: string;
  }>;
}
```

---

## 🔗 Связанные документы

- [[FrontEnd/Kitchen-helper/docs/🔧 Shared/ui/🔔 Alert|Alert Component]]
- [[🔔 Alerts|Alerts Component]]
- [[🔔 AlertProvider|AlertProvider]]

