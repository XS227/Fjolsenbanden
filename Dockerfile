# syntax=docker/dockerfile:1

FROM node:20-bullseye-slim AS builder
WORKDIR /app

COPY package*.json ./
RUN npm ci || npm install

COPY . .
ENV NODE_ENV=production
RUN npm run build

FROM nginx:stable-alpine AS runner
WORKDIR /usr/share/nginx/html
COPY --from=builder /app/dist/ .
