# 📅 prepareDateForInput.ts

Функция подготовки даты для HTML input[type="date"].

## 📍 Расположение

`src/shared/lib/helpers/prepareDateForInput/prepareDateForInput.ts`

## 📝 Описание

Преобразует Date объект или строку в формат `YYYY-MM-DD` для использования в HTML input[type="date"].

## 🔧 Сигнатура

```typescript
export const prepareDateForInput = (
  date?: Date | string
): string
```

## 💡 Использование

### Из Date объекта

```typescript
import { prepareDateForInput } from '@/shared/lib/helpers';

const date = new Date(2024, 11, 25);
const formatted = prepareDateForInput(date);
// Результат: "2024-12-25"
```

### Из строки в формате YYYY-MM-DD

```typescript
const formatted = prepareDateForInput('2024-12-25');
// Результат: "2024-12-25" (без изменений)
```

### Из строки в формате DD.MM.YYYY

```typescript
const formatted = prepareDateForInput('25.12.2024');
// Результат: "2024-12-25"
```

### С undefined/null

```typescript
const formatted = prepareDateForInput(undefined);
// Результат: ""

const formatted2 = prepareDateForInput(null);
// Результат: ""
```

### Использование в формах

```typescript
const [date, setDate] = useState<Date>();

<input
  type="date"
  value={prepareDateForInput(date)}
  onChange={(e) => setDate(new Date(e.target.value))}
/>
```

## 🔄 Поддерживаемые форматы

1. **Date объект** - преобразуется в ISO и обрезается до даты
2. **YYYY-MM-DD** - возвращается как есть
3. **DD.MM.YYYY** - преобразуется в YYYY-MM-DD
4. **Другие строки** - пытается распарсить через Date

## ⚠️ Особенности

- Невалидные даты возвращают пустую строку
- Пустые строки возвращают пустую строку
- Автоматически обрабатывает различные форматы

## 🔗 Связанные документы

- [[🔧 Shared/lib/helpers|Вспомогательные функции]]
- [[📅 parseDate|parseDate]]

