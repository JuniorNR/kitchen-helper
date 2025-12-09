# 🎭 customizeString.ts

Функция кастомизации строк с поддержкой локализации и склонений.

## 📍 Расположение

`src/shared/lib/helpers/customizeString/customizeString.ts`

## 📝 Описание

Универсальная функция для кастомизации строк с поддержкой:
- Обрезки строк
- Локализации (русский/английский)
- Склонений для русского языка
- Множественного числа для английского

## 🔧 Сигнатура

```typescript
export const customizeString = (
  string: string,
  options: {
    language?: string;
    cut?: {
      english?: number;
      russian?: number;
      separator?: string;
    };
    ended?: {
      countTrigger: number;
      russian?: {
        zero?: string;
        one?: string;
        fromTwoToFour?: string;
        fromFiveToTen?: string;
        fromElevenToNineteen?: string;
      };
      english?: {
        moreThatOne?: string;
      };
    };
  },
): string
```

## 💡 Использование

### Обрезка строки

```typescript
import { customizeString } from '@/shared/lib/helpers';

const result = customizeString('Hello World', {
  language: 'en',
  cut: {
    english: 5,
    separator: '...'
  }
});
// Результат: "Hello..."
```

### Русские склонения

```typescript
const result = customizeString('рецепт', {
  language: 'ru',
  ended: {
    countTrigger: 5,
    russian: {
      zero: 'ов',
      one: '',
      fromTwoToFour: 'а',
      fromFiveToTen: 'ов',
      fromElevenToNineteen: 'ов'
    }
  }
});
// Результат: "рецептов" (для числа 5)
```

### Английское множественное число

```typescript
const result = customizeString('recipe', {
  language: 'en',
  ended: {
    countTrigger: 5,
    english: {
      moreThatOne: 's'
    }
  }
});
// Результат: "recipes"
```

### Комплексный пример

```typescript
const result = customizeString('ингредиент', {
  language: 'ru',
  cut: {
    russian: 8,
    separator: '...'
  },
  ended: {
    countTrigger: 3,
    russian: {
      zero: 'ов',
      one: '',
      fromTwoToFour: 'а',
      fromFiveToTen: 'ов'
    }
  }
});
// Результат: "ингредиент..." + "а" = "ингредиент...а"
```

## 📋 Правила склонений (русский)

- **0, 10, 20...**: `zero`
- **1, 21, 31...**: `one`
- **2-4, 22-24...**: `fromTwoToFour`
- **5-9, 25-29...**: `fromFiveToTen`
- **11-19**: `fromElevenToNineteen`

## 🔗 Связанные документы

- [[🔧 Shared/lib/helpers|Вспомогательные функции]]
- [[🔧 Shared/lib/helpers/✂️ cutStringWithSeparator|cutStringWithSeparator]]

