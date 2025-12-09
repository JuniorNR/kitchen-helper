# 📋 ingredient.types.ts

TypeScript типы для ингредиентов.

## 📍 Расположение

`src/entities/ingredient/model/ingredient.types.ts`

## 📝 Описание

Определяет все TypeScript интерфейсы для работы с ингредиентами.

## 🔧 Типы

### `Ingredient`

Клиентский тип ингредиента (camelCase):

```typescript
{
  id: string;
  title: string;
  description: string;
  price: number;
  currency: string;
  unit: string;
  category: string;
  createdAt: string;
  updatedAt: string;
  stepsCount: number;
  usage?: {
    amount: string;
  };
}
```

### `IngredientDTO`

Серверный тип ингредиента (snake_case):

```typescript
{
  id: string;
  title: string;
  description: string;
  price: number;
  currency: string;
  unit: string;
  category: string;
  created_at: string;
  updated_at: string;
  steps_count: number;
}
```

### `UseIngredients`

Параметры для хука:

```typescript
{
  page?: number;
  filters?: Partial<IngredientListFilter>;
}
```

## 🔗 Связанные документы

- [[🥘 Ingredient|📦 Entities/🥘 Ingredient]]
- [[🥘 Ingredient/📡 ingredient.api|ingredient.api.ts]]
- [[🥘 Ingredient/🪝 useIngredient|useIngredient.ts]]

