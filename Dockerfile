FROM node:20-bullseye-slim AS builder
WORKDIR /app

# ✅ Fix BEFORE install
ENV ROLLUP_SKIP_NODEJS_NATIVE_BUILD=1

COPY package*.json ./
RUN npm install

COPY . .

ENV NODE_ENV=production
RUN npm run build

FROM nginx:stable-alpine AS runner
WORKDIR /usr/share/nginx/html
COPY --from=builder /app/dist .
