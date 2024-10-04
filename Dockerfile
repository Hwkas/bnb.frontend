# Base Image
FROM node:current-alpine AS base


# Build Stage
FROM base AS builder

WORKDIR /app

COPY package*.json ./

RUN npm i -g pnpm && \
    if [ "$NODE_ENV" = "production" ]; then pnpm install --frozen-lockfile --prod; \
    else npm i; \
    fi

COPY . .

RUN pnpm run build


# Production Stage
FROM base AS runner

WORKDIR /app

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone .
COPY --from=builder /app/.next/static ./static
