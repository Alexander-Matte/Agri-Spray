# Multi-stage build for Nuxt 4 frontend
FROM node:20-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat curl
WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm ci

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NEXT_TELEMETRY_DISABLED 1

RUN npm run build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1
ENV NODE_EXTRA_CA_CERTS=/usr/local/share/ca-certificates/caddy-root.crt

# Install required packages and trust Caddy root cert
RUN apk add --no-cache curl ca-certificates
COPY certs/caddy-root.crt /usr/local/share/ca-certificates/
RUN update-ca-certificates

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

RUN mkdir .next
RUN chown nextjs:nodejs .next

COPY --from=builder --chown=nextjs:nodejs /app/.output/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.output/public ./.output/public

USER nextjs

EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

CMD ["node", "server.js"]

# Development stage
FROM base AS dev
WORKDIR /app

ENV NODE_EXTRA_CA_CERTS=/usr/local/share/ca-certificates/caddy-root.crt

# Install required packages and trust Caddy root cert
RUN apk add --no-cache curl ca-certificates
COPY certs/caddy-root.crt /usr/local/share/ca-certificates/
RUN update-ca-certificates

COPY package.json package-lock.json* ./
RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]
