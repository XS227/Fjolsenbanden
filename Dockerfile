# syntax=docker/dockerfile:1

FROM node:20-bullseye-slim AS builder
WORKDIR /app

COPY package*.json ./
RUN npm ci || npm install

COPY . .

ENV NODE_ENV=production
# 💡 Prevent Rollup native binary requirement
ENV ROLLUP_SKIP_NODEJS_NATIVE_BUILD=1

RUN npm run build

FROM nginx:stable-alpine AS runner
WORKDIR /usr/share/nginx/html
COPY --from=builder /app/dist/ .

# Optional: enable gzip/brotli config overrides later
