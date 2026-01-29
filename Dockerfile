# Базовый образ: Node.js LTS на Alpine Linux (маленький размер)
FROM node:lts-alpine3.23

# Рабочая директория внутри контейнера
WORKDIR /app

# Установка pnpm (проект использует pnpm)
RUN corepack enable && corepack prepare pnpm@9.0.0 --activate

# Копируем файлы зависимостей (слой кэшируется отдельно)
COPY package.json pnpm-lock.yaml ./

# Устанавливаем зависимости (включая dev — нужны для сборки)
RUN pnpm install --frozen-lockfile

# Копируем исходный код
COPY . .

# Собираем Next.js приложение
RUN pnpm build

# Порт приложения
EXPOSE 3000

# Переменная для Next.js в production
ENV NODE_ENV=development

# Запуск приложения
CMD ["pnpm", "start"]