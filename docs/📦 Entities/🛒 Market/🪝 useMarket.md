# 🪝 useMarket.ts

Кастомный хук для работы с магазинами.

## 📍 Расположение

`src/entities/market/model/useMarket.ts`

## 📝 Описание

Объединяет RTK Query хуки для работы с магазинами в один удобный интерфейс.

## 🔧 Параметры

```typescript
{
  page: number;
}
```

## 📤 Возвращаемые значения

```typescript
{
  markets: ApiResponse<Market[]> | undefined;
  isLoading: boolean;
}
```

## 💡 Использование

```typescript
import { useMarket } from '@/entities/market';

const { markets, isLoading } = useMarket({ page: 1 });
```

## 🔗 Связанные документы

- [[🛒 Market|📦 Entities/🛒 Market]]
- [[🛒 Market/📡 market.api|market.api.ts]]
- [[🛒 MarketList Feature|🎨 Features/🛒 MarketList]]

