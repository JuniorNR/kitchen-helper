# 🔧 Shared

Документация общих утилит, компонентов и библиотек.

## 📂 Структура

Shared содержит переиспользуемые компоненты, утилиты, хуки и провайдеры, используемые во всех слоях приложения.

```
shared/
├── 📚 lib/                 # Библиотеки и утилиты
│   ├── configs/            # Конфигурации
│   ├── constants/          # Константы
│   ├── helpers/            # Вспомогательные функции
│   ├── hooks/              # Кастомные хуки
│   ├── providers/          # React провайдеры
│   ├── store/              # Redux store
│   └── types/              # Общие типы
├── 🌐 locales/             # Переводы (i18n)
│   ├── en/                 # Английский
│   └── ru/                 # Русский
└── 🎨 ui/                  # UI компоненты
```

## 📚 Разделы

### [[📚 lib|🔧 Shared/lib/📚 index]]

Библиотеки и утилиты.

**Подразделы**:
- **configs/** - конфигурации (Echo) → [[🔧 Shared/lib/configs/echo/📡 echo.config|echo.config]]
- **constants/** - константы приложения
- **helpers/** - вспомогательные функции → [[🔧 Shared/lib/helpers/📚 index|Helpers Index]]
- **hooks/** - кастомные React хуки → [[🔧 Shared/lib/hooks/📚 index|Hooks Index]]
- **providers/** - React провайдеры → [[🔧 Shared/lib/providers/📚 index|Providers Index]]
- **store/** - Redux store и baseQuery → [[🔧 Shared/lib/store/📚 index|Store Index]]
- **types/** - общие TypeScript типы

---

### 🌐 locales

Файлы переводов для интернационализации.

**Структура**:
- `common.json` - общие переводы
- `ingredients.json` - переводы для ингредиентов
- `recipes.json` - переводы для рецептов
- `chats.json` - переводы для чатов
- `markets.json` - переводы для магазинов
- и другие...

**Связанные документы**:
- [[🔧 Shared/lib/providers/🌐 I18nProvider|I18n Provider]]

---

### [[🎨 ui|🔧 Shared/ui/📚 index]]

Переиспользуемые UI компоненты.

**Компоненты**:
- [[🔧 Shared/ui/🔔 Alert|Alert]] - уведомление
- **Alerts** - контейнер уведомлений
- **DeleteButton** - кнопка удаления
- [[🔧 Shared/ui/🔍 Filter|Filter]] - компоненты фильтрации
- **icons** - иконки приложения
- **ImagesPick** - выбор изображений
- [[🔧 Shared/ui/🪟 Modal|Modal]] - модальное окно
- [[🔧 Shared/ui/🔢 NumberInput|NumberInput]] - числовой ввод
- [[🔧 Shared/ui/📄 PageInfoBlock|PageInfoBlock]] - информационный блок страницы
- [[🔧 Shared/ui/📄 PaginationBar|PaginationBar]] - панель пагинации
- **PriceInput** - ввод цены
- **Range** - диапазон значений
- **Slider** - слайдер
- [[🔧 Shared/ui/📝 Typography|Typography]] - типографика
- **UnitInput** - ввод единиц измерения

---

## 🔧 Helpers

### [[🔧 Shared/lib/helpers/📚 index|Вспомогательные функции]]

- [[🔧 Shared/lib/helpers/🎨 classNames|classNames]] - объединение CSS классов
- [[🔧 Shared/lib/helpers/🎭 customizeString|customizeString]] - кастомизация строк
- [[🔧 Shared/lib/helpers/✂️ cutStringWithSeparator|cutStringWithSeparator]] - обрезка строки с разделителем
- [[🔧 Shared/lib/helpers/🗑️ deleteFieldsWithUndefinedValues|deleteFieldsWithUndefinedValues]] - удаление полей с undefined
- [[🔧 Shared/lib/helpers/📦 dto|dto]] - преобразование DTO (snake_case ↔ camelCase)
- [[🔧 Shared/lib/helpers/💾 localStorageHelper|localStorageHelper]] - работа с localStorage
- [[🔧 Shared/lib/helpers/🔀 mergeUniqueKeysObjects|mergeUniqueKeysObjects]] - объединение объектов
- [[🔧 Shared/lib/helpers/🚫 omitKeyObject|omitKeyObject]] - исключение ключей из объекта
- [[🔧 Shared/lib/helpers/📅 parseDate|parseDate]] - парсинг даты
- [[🔧 Shared/lib/helpers/📝 prepareCase|prepareCase]] - подготовка регистра
- [[🔧 Shared/lib/helpers/📅 prepareDateForInput|prepareDateForInput]] - подготовка даты для input
- [[🔧 Shared/lib/helpers/📅 serializeDate|serializeDate]] - сериализация даты

---

## 🪝 Hooks

### [[🔧 Shared/lib/hooks/📚 index|Кастомные хуки]]

- [[🔧 Shared/lib/hooks/🔄 useAppDispatch|useAppDispatch]] - типизированный dispatch
- [[🔧 Shared/lib/hooks/🔄 useAppSelector|useAppSelector]] - типизированный selector
- [[🔧 Shared/lib/hooks/📜 useScroll|useScroll]] - отслеживание скролла

---

## 🎭 Providers

### [[🔧 Shared/lib/providers/📚 index|React провайдеры]]

- **AppProviders** - главный провайдер, объединяющий все провайдеры
- **AlertProvider** - провайдер уведомлений
- [[🔧 Shared/lib/providers/📡 EchoProvider|EchoProvider]] - провайдер Laravel Echo
- **HeroUIProvider** - провайдер UI библиотеки
- [[🔧 Shared/lib/providers/🌐 I18nProvider|I18nProvider]] - провайдер интернационализации

---

## 🗄️ Store

### [[🔧 Shared/lib/store/📚 index|Redux Store]]

- `store.ts` - конфигурация Redux store
- [[🔧 Shared/lib/store/🔌 baseQuery|baseQuery.ts]] - базовый запрос для RTK Query

**Reducers**:
- `counter` - счетчик (пример)
- `auth` - аутентификация
- `alert` - уведомления
- RTK Query APIs для всех entities

---

## 🔗 Связанные документы

- [[📁 Структура проекта|📁 Структура проекта]]
- [[📦 Entities|📦 Entities]]
- [[🎨 Features|🎨 Features]]
- [[🧩 Widgets|🧩 Widgets]]

