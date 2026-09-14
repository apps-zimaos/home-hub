FROM node:22-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

ARG VITE_BACKGROUND_URL
ARG VITE_SYSTEM_NAME
ARG VITE_API_URL
ARG VITE_HOME_SERVER_URL

ENV VITE_BACKGROUND_URL=$VITE_BACKGROUND_URL
ENV VITE_SYSTEM_NAME=$VITE_SYSTEM_NAME
ENV VITE_API_URL=$VITE_API_URL
ENV VITE_HOME_SERVER_URL=$VITE_HOME_SERVER_URL

RUN npm run build


FROM nginx:alpine

COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80