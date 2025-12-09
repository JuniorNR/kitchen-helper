# 🪝 useIngredient.ts

Кастомный хук для работы с ингредиентами.

## 📍 Расположение

`src/entities/ingredient/model/useIngredient.ts`

## 📝 Описание

Объединяет RTK Query хуки для работы с ингредиентами в один удобный интерфейс.

## 🔧 Параметры

```typescript
{
  page?: number;
  filters?: Partial<IngredientListFilter>;
}
```

## 📤 Возвращаемые значения

```typescript
{
  ingredients: Ingredient[] | undefined;
  pagination: ApiResponsePagination | undefined;
  isLoading: boolean;
  error: ApiError | undefined;
  createIngredientData: (data: IngredientCreateFormDataType) => Promise<Ingredient | null>;
  deleteIngredientData: (id: string) => Promise<void | null>;
  isDeleteIngredientLoading: boolean;
  isCreateIngredientLoading: boolean;
}
```

## 💡 Использование

```typescript
import { useIngredient } from '@/entities/ingredient';

const {
  ingredients,
  pagination,
  isLoading,
  createIngredientData,
  deleteIngredientData
} = useIngredient({ 
  page: 1,
  filters: { category: 'food' }
});
```

## 🔄 Особенности

- Автоматическая сериализация дат в фильтрах
- Обработка ошибок
- Состояния загрузки для всех операций

## 🔗 Связанные документы

- [[🥘 Ingredient|📦 Entities/🥘 Ingredient]]
- [[🥘 Ingredient/📡 ingredient.api|ingredient.api.ts]]
- [[🥘 IngredientsList Feature|🎨 Features/🥘 IngredientsList]]

