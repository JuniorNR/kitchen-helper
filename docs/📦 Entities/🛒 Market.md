# 🛒 Market Entity

Сущность магазина для покупок ингредиентов.

## 📍 Расположение

`src/entities/market/`

## 📂 Структура

```
market/
├── index.ts                # Публичный API
└── model/
    ├── market.api.ts       # RTK Query API
    ├── market.types.ts    # TypeScript типы
    ├── market.utils.ts    # Утилиты (пустой файл)
    └── useMarket.ts       # Хук для работы с магазинами
```

## 📄 Файлы

### [[📡 market.api|market.api.ts]]

RTK Query API для работы с магазинами.

**Endpoints**:
- `getMarkets` - GET `/markets` - получение списка магазинов с пагинацией

**Связанные документы**:
- [[📋 market.types|market.types.ts]]
- [[🪝 useMarket|useMarket.ts]]

---

### [[📋 market.types|market.types.ts]]

TypeScript типы для магазинов.

**Типы**:
- `Market` - клиентский тип магазина
- `MarketDTO` - серверный тип магазина
- `Seller` / `SellerDTO` - продавец
- `BuyMostOften` / `BuyMostOftenDTO` - часто покупаемые товары
- `FactsAboutSeller` / `FactsAboutSellerDTO` - факты о продавце
- `ThemesOfMarket` / `ThemesOfMarketDTO` - темы магазина
- `UseMarket` - параметры для хука

**Связанные документы**:
- [[📡 market.api|market.api.ts]]
- [[🪝 useMarket|useMarket.ts]]

---

### [[🪝 useMarket|useMarket.ts]]

Кастомный хук для работы с магазинами.

**Параметры**:
```typescript
{
  page: number;
}
```

**Возвращает**:
```typescript
{
  markets: ApiResponse<Market[]> | undefined;
  isLoading: boolean;
}
```

**Связанные документы**:
- [[📡 market.api|market.api.ts]]
- [[🛒 MarketList Feature|🎨 Features/🛒 MarketList]]

---

## 🔗 Связанные документы

- [[📦 Entities|📦 Entities]]
- [[🛒 MarketList Feature|🎨 Features/🛒 MarketList]]

