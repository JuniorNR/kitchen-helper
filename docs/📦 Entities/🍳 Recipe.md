# 🍳 Recipe Entity

Сущность рецепта блюда.

## 📍 Расположение

`src/entities/recipe/`

## 📂 Структура

```
recipe/
├── index.ts                # Публичный API
└── model/
    ├── recipe.api.ts       # RTK Query API
    ├── recipe.type.ts      # TypeScript типы
    ├── recipe.utils.ts     # Утилиты для рецептов
    └── useRecipe.ts        # Хук для работы с рецептами
```

## 📄 Файлы

### [[📡 recipe.api|recipe.api.ts]]

RTK Query API для работы с рецептами.

**Endpoints**:
- `getRecipes` - GET `/recipes` - получение списка с пагинацией и фильтрами
- `createRecipe` - POST `/recipes/create` - создание рецепта
- `deleteRecipe` - DELETE `/recipes/delete/:id` - удаление рецепта

**Связанные документы**:
- [[📋 recipe.type|recipe.type.ts]]
- [[🛠️ recipe.utils|recipe.utils.ts]]
- [[🪝 useRecipe|useRecipe.ts]]

---

### [[📋 recipe.type|recipe.type.ts]]

TypeScript типы для рецептов.

**Типы**:
- `Recipe` - клиентский тип рецепта
- `RecipeDTO` - серверный тип рецепта
- `RecipeImage` / `RecipeImageDTO` - изображение рецепта
- `RecipeStep` / `RecipeStepDTO` - шаг рецепта
- `UseRecipe` - параметры для хука

**Связанные документы**:
- [[📡 recipe.api|recipe.api.ts]]
- [[🪝 useRecipe|useRecipe.ts]]

---

### [[🛠️ recipe.utils|recipe.utils.ts]]

Утилиты для работы с рецептами.

**Функции**:
- `buildRecipeCreateFormData(input: RecipeCreateFormInputType): FormData` - построение FormData для создания рецепта

**Связанные документы**:
- [[📡 recipe.api|recipe.api.ts]]
- [[➕ RecipeCreate Feature|🎨 Features/➕ RecipeCreate]]

---

### [[🪝 useRecipe|useRecipe.ts]]

Кастомный хук для работы с рецептами.

**Параметры**:
```typescript
{
  page?: number;
  filters?: Partial<RecipeListFilter>;
}
```

**Возвращает**:
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

**Связанные документы**:
- [[📡 recipe.api|recipe.api.ts]]
- [[🍳 RecipesList Feature|🎨 Features/🍳 RecipesList]]

---

## 🔗 Связанные документы

- [[📦 Entities|📦 Entities]]
- [[🍳 RecipesList Feature|🎨 Features/🍳 RecipesList]]
- [[➕ RecipeCreate Feature|🎨 Features/➕ RecipeCreate]]

