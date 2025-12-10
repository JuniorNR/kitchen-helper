# 📱 layout.tsx

Корневой layout приложения.

## 📍 Расположение

`src/app/layout.tsx`

## 📝 Описание

Определяет структуру всего приложения, включая метаданные, шрифты, провайдеры и layout компоненты.

## 🎨 Структура

```typescript
<html>
  <body>
    <AppProviders>
      <div>
        <Header />
        <main>
          <AuthBoundary>
            {children}
          </AuthBoundary>
        </main>
        <Footer />
      </div>
    </AppProviders>
  </body>
</html>
```

## 🔧 Компоненты

- **AppProviders** - все провайдеры приложения
- **Header** - хедер приложения
- **Footer** - футер приложения
- **AuthBoundary** - защита маршрутов

## 📝 Метаданные

- **title**: 'Kitchen helper'
- **description**: 'An assistant in the kitchen, helps to write down recipes for dishes'

## 🎨 Шрифты

- **Geist Sans** - основной шрифт
- **Geist Mono** - моноширинный шрифт

## 🔗 Связанные документы

- [[📄 Header|Header Widget]]
- [[📄 Footer|Footer Widget]]
- [[🔐 Auth Feature|🎨 Features/🔐 Auth]]
- [[📐 layout.config|layout.config.ts]]

