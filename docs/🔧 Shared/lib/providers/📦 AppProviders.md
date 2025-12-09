# 📦 AppProviders.tsx

Главный провайдер приложения.

## 📍 Расположение

`src/shared/lib/providers/AppProviders/ui/AppProviders.tsx`

## 📝 Описание

Объединяет все провайдеры приложения в правильном порядке.

## 🎯 Структура провайдеров

```typescript
<ReduxProvider>
  <I18nProvider>
    <HeroUIProvider>
      <ThemeProvider>
        <EchoProvider>
          <AlertProvider>
            {children}
          </AlertProvider>
        </EchoProvider>
      </ThemeProvider>
    </HeroUIProvider>
  </I18nProvider>
</ReduxProvider>
```

## 💡 Использование

```typescript
import { AppProviders } from '@/shared/lib/providers';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <AppProviders>
          {children}
        </AppProviders>
      </body>
    </html>
  );
}
```

## 🔄 Порядок провайдеров

1. **ReduxProvider** - Redux store
2. **I18nProvider** - интернационализация
3. **HeroUIProvider** - UI библиотека
4. **ThemeProvider** - темы (next-themes)
5. **EchoProvider** - Laravel Echo
6. **AlertProvider** - уведомления

## 🔗 Связанные документы

- [[🔧 Shared/lib/providers|React провайдеры]]
- [[📱 App/layout|Root Layout]]

