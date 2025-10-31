# syntax=docker/dockerfile:1
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
ENV NODE_ENV=production
RUN npm run build

# Final stage copies output only
FROM alpine AS runner
WORKDIR /out
COPY --from=builder /app/dist/. .
