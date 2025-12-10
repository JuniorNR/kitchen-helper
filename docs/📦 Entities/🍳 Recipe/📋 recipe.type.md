# 📋 recipe.type.ts

TypeScript типы для рецептов.

## 📍 Расположение

`src/entities/recipe/model/recipe.type.ts`

## 📝 Описание

Определяет все TypeScript интерфейсы для работы с рецептами.

## 🔧 Типы

### `Recipe`

Клиентский тип рецепта (camelCase):

```typescript
{
  id: number;
  userId: number;
  title: string;
  description: string;
  ration: string;
  type: string;
  calories: number;
  carbohydrates: number;
  fats: number;
  proteins: number;
  priceOfDish: number;
  priceToBuy: number;
  images: RecipeImage[];
  steps: RecipeStep[];
  user: User;
  createdAt: string;
  updatedAt: string;
}
```

### `RecipeDTO`

Серверный тип рецепта (snake_case):

```typescript
{
  id: number;
  userId: number;
  title: string;
  description: string;
  ration: string;
  price_of_dish: number;
  price_to_buy: number;
  calories: number;
  carbohydrates: string;
  fats: number;
  proteins: string;
  images: RecipeImageDTO[];
  steps: RecipeStepDTO[];
  user: UserDTO;
  created_at: string;
  updated_at: string;
}
```

### Вложенные типы

- `RecipeImage` / `RecipeImageDTO` - изображение рецепта
- `RecipeStep` / `RecipeStepDTO` - шаг рецепта с ингредиентами

### `UseRecipe`

Параметры для хука:

```typescript
{
  page?: number;
  filters?: Partial<RecipeListFilter>;
}
```

## 🔗 Связанные документы

- [[🍳 Recipe|📦 Entities/🍳 Recipe]]
- [[📡 recipe.api|recipe.api.ts]]
- [[🪝 useRecipe|useRecipe.ts]]

