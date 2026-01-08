# 🐞 Troubleshooting

- `ReferenceError: fetch is not defined` → подключите `whatwg-fetch` в `setupTests.ts`.
- Ошибки с CSS/SCSS → проверьте `identity-obj-proxy` в `moduleNameMapper`.
- `TextEncoder is not defined` → добавьте в `setupTests.ts`:
  ```typescript
  import { TextEncoder, TextDecoder } from "node:util";
  Object.assign(global, { TextEncoder, TextDecoder });
  ```

Если тесты не находят файлы:
- Убедитесь, что расширения `.test.ts(x)` или `.spec.ts(x)` и пути входят в `testMatch`.
- Проверьте относительный путь `__mocks__/fileMock.js` в `moduleNameMapper`.

Если падает из-за Next-специфичных модулей:
- Добавьте/актуализируйте моки `next/navigation`, `next/router`, `next/image`.
- Перепроверьте, что тест запускается в `jsdom` (не `node`).

## ↔ Навигация
- Назад: [[💡 Best Practices|jest-rtl/💡 Best Practices]]
- К началу: [[🧪 Jest + React Testing Library|jest-rtl/🧪 Jest + React Testing Library]]

