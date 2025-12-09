# 📡 ingredient.api.ts

RTK Query API для работы с ингредиентами.

## 📍 Расположение

`src/entities/ingredient/model/ingredient.api.ts`

## 📝 Описание

Определяет endpoints для работы с ингредиентами через RTK Query.

## 🔧 Endpoints

### `getIngredients`

Получение списка ингредиентов с пагинацией и фильтрацией.

- **Метод**: GET
- **URL**: `/ingredients`
- **Параметры**: `{ page, filters }`
- **Возвращает**: `ApiResponse<Ingredient[], ApiResponsePagination>`
- **Tags**: `['Ingredients']`

**Особенности**:
- Поддержка фильтрации через `IngredientListFilter`
- Автоматическое преобразование DTO
- Обработка ошибок с показом уведомлений

---

### `createIngredient`

Создание нового ингредиента.

- **Метод**: POST
- **URL**: `/ingredients/create`
- **Тело**: `IngredientCreateFormDataType`
- **Возвращает**: `Ingredient`
- **Tags**: Инвалидирует `['Ingredients']`

---

### `deleteIngredient`

Удаление ингредиента.

- **Метод**: DELETE
- **URL**: `/ingredients/delete/:id`
- **Параметры**: `id` (string)
- **Возвращает**: `void`
- **Tags**: Инвалидирует `['Ingredients']`

---

## 🔧 Экспорты

- `ingredientApi` - RTK Query API instance
- `useGetIngredientsQuery` - хук для получения ингредиентов
- `useCreateIngredientMutation` - хук для создания
- `useDeleteIngredientMutation` - хук для удаления

---

## 🔗 Связанные документы

- [[🥘 Ingredient|📦 Entities/🥘 Ingredient]]
- [[🥘 Ingredient/🪝 useIngredient|useIngredient.ts]]

