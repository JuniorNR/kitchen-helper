# 🪝 useRecipe.ts

Кастомный хук для работы с рецептами.

## 📍 Расположение

`src/entities/recipe/model/useRecipe.ts`

## 📝 Описание

Объединяет RTK Query хуки для работы с рецептами в один удобный интерфейс.

## 🔧 Параметры

```typescript
{
  page?: number;
  filters?: Partial<RecipeListFilter>;
}
```

## 📤 Возвращаемые значения

```typescript
{
  recipes: Recipe[] | undefined;
  pagination: ApiResponsePagination | undefined;
  isLoading: boolean;
  error: ApiError | undefined;
  refetch: () => void;
  createRecipeData: (data: RecipeCreateFormInputType) => Promise<Recipe | null>;
  deleteRecipeData: (id: string) => Promise<{ code: string } | null>;
  isCreating: boolean;
  isDeleting: boolean;
}
```

## 💡 Использование

```typescript
import { useRecipe } from '@/entities/recipe';

const {
  recipes,
  pagination,
  isLoading,
  createRecipeData,
  deleteRecipeData
} = useRecipe({ 
  page: 1,
  filters: { type: 'main' }
});
```

## 🔄 Особенности

- Автоматическая сериализация дат в фильтрах
- Обработка ошибок
- Состояния загрузки для всех операций
- Функция refetch для обновления данных

## 🔗 Связанные документы

- [[🍳 Recipe|📦 Entities/🍳 Recipe]]
- [[📡 recipe.api|recipe.api.ts]]
- [[🍳 RecipesList Feature|🎨 Features/🍳 RecipesList]]

