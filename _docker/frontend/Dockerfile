FROM node:14.19.3

# Папка приложения
RUN mkdir -p /frontend
WORKDIR /frontend

# Установка зависимостей
COPY ./frontend/package*.json ./
RUN npm install
# Для использования в продакшне
# RUN npm install --production

# Копирование файлов проекта
COPY ./frontend .

# Уведомление о порте, который будет прослушивать работающее приложение
EXPOSE 3000

