# ➕ IngredientCreate Feature

Создание нового ингредиента.

## 📍 Расположение

`src/features/ingredientCreate/`

## 📂 Структура

```
ingredientCreate/
├── index.ts
├── model/
│   ├── IngredientCreate.schema.ts
│   └── IngredientCreate.types.ts
└── ui/
    └── ingredientCreate.tsx
```

## 📄 Компонент

### `ingredientCreate.tsx`

Главный компонент создания ингредиента.

**Функциональность**:
- Форма создания ингредиента
- Валидация через Zod
- Отправка данных на сервер
- Уведомления об успехе/ошибке

**Поля формы**:
- Название
- Описание
- Цена (с валютой)
- Единица измерения
- Категория

---

## 🔧 Схема валидации

### `IngredientCreate.schema.ts`

Zod схема для валидации формы:
- Название (обязательно)
- Описание (обязательно)
- Цена (минимум 1)
- Валюта (USD, RUB, EUR)
- Единица измерения
- Категория

---

## 🔗 Связанные документы

- [[🥘 Ingredient Entity|📦 Entities/🥘 Ingredient]]
- [[💰 PriceInput|PriceInput Component]]
- [[📏 UnitInput|UnitInput Component]]

