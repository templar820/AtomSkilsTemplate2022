FROM node:14.19.3

# Папка приложения
RUN mkdir -p /backend
WORKDIR /backend

# Установка зависимостей
COPY ./backend/package*.json ./
RUN npm install
# Для использования в продакшне
# RUN npm install --production

# Копирование файлов проекта
COPY ./backend .



