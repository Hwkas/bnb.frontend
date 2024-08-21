# Build stage
FROM node:current-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm i

COPY . .

RUN npm run build


# Production stage
FROM node:current-alpine

WORKDIR /app

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone .
COPY --from=builder /app/.next/static ./static
