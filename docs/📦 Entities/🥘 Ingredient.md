# 🥘 Ingredient Entity

Сущность ингредиента для рецептов.

## 📍 Расположение

`src/entities/ingredient/`

## 📂 Структура

```
ingredient/
├── index.ts                # Публичный API
└── model/
    ├── ingredient.api.ts   # RTK Query API
    ├── ingredient.types.ts # TypeScript типы
    └── useIngredient.ts    # Хук для работы с ингредиентами
```

## 📄 Файлы

### [[📡 ingredient.api|ingredient.api.ts]]

RTK Query API для работы с ингредиентами.

**Endpoints**:
- `getIngredients` - GET `/ingredients` - получение списка с пагинацией и фильтрами
- `createIngredient` - POST `/ingredients/create` - создание ингредиента
- `deleteIngredient` - DELETE `/ingredients/delete/:id` - удаление ингредиента

**Связанные документы**:
- [[📋 ingredient.types|ingredient.types.ts]]
- [[🪝 useIngredient|useIngredient.ts]]

---

### [[📋 ingredient.types|ingredient.types.ts]]

TypeScript типы для ингредиентов.

**Типы**:
- `Ingredient` - клиентский тип ингредиента
- `IngredientDTO` - серверный тип ингредиента
- `UseIngredients` - параметры для хука

**Связанные документы**:
- [[📡 ingredient.api|ingredient.api.ts]]
- [[🪝 useIngredient|useIngredient.ts]]

---

### [[🪝 useIngredient|useIngredient.ts]]

Кастомный хук для работы с ингредиентами.

**Параметры**:
```typescript
{
  page?: number;
  filters?: Partial<IngredientListFilter>;
}
```

**Возвращает**:
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

**Связанные документы**:
- [[📡 ingredient.api|ingredient.api.ts]]
- [[🥘 IngredientsList Feature|🎨 Features/🥘 IngredientsList]]

---

## 🔗 Связанные документы

- [[📦 Entities|📦 Entities]]
- [[🥘 IngredientsList Feature|🎨 Features/🥘 IngredientsList]]
- [[➕ IngredientCreate Feature|🎨 Features/➕ IngredientCreate]]

