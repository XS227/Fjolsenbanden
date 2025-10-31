# syntax=docker/dockerfile:1

###
### Builder — Use Debian-based for full Vite/Rollup support
###
FROM node:20 AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci || npm install

COPY . .
ENV NODE_ENV=production
RUN npm run build


###
### Artifact — extract static build artifacts only
###
FROM alpine AS runner
WORKDIR /out
COPY --from=builder /app/dist/. .
