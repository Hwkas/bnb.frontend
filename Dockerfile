# Base Image
FROM node:current-alpine AS base


# Build Stage
FROM base AS builder

WORKDIR /app

COPY package*.json ./

RUN \
    if [ "$NODE_ENV" = "production" ]; then npm ci; \
    else npm i; \
    fi

COPY . .

RUN npm run build


# Production Stage
FROM base AS runner

WORKDIR /app

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone .
COPY --from=builder /app/.next/static ./static
