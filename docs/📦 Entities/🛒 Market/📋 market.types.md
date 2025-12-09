# 📋 market.types.ts

TypeScript типы для магазинов.

## 📍 Расположение

`src/entities/market/model/market.types.ts`

## 📝 Описание

Определяет все TypeScript интерфейсы для работы с магазинами.

## 🔧 Типы

### `Market`

Клиентский тип магазина (camelCase):

```typescript
{
  id: number;
  title: string;
  images: string[] | null;
  averagePrice: string;
  rating: string;
  countOfRecipes: number;
  description: string;
  story: string;
  createdAt: string;
  updatedAt: string;
  seller: Seller;
  themesOfMarket: ThemesOfMarket[];
  buyMostOften: BuyMostOften[];
  factsAboutSeller: FactsAboutSeller[];
}
```

### `MarketDTO`

Серверный тип магазина (snake_case):

```typescript
{
  id: number;
  title: string;
  images: string[] | null;
  average_price: string;
  rating: string;
  count_of_recipes: number;
  description: string;
  story: string;
  created_at: string;
  updated_at: string;
  seller: SellerDTO;
  themes_of_market: ThemesOfMarketDTO[];
  buy_most_often: BuyMostOftenDTO[];
  facts_about_seller: FactsAboutSellerDTO[];
}
```

### Вложенные типы

- `Seller` / `SellerDTO` - продавец
- `BuyMostOften` / `BuyMostOftenDTO` - часто покупаемые товары
- `FactsAboutSeller` / `FactsAboutSellerDTO` - факты о продавце
- `ThemesOfMarket` / `ThemesOfMarketDTO` - темы магазина

### `UseMarket`

Параметры для хука:

```typescript
{
  page: number;
}
```

## 🔗 Связанные документы

- [[🛒 Market|📦 Entities/🛒 Market]]
- [[🛒 Market/📡 market.api|market.api.ts]]
- [[🛒 Market/🪝 useMarket|useMarket.ts]]

