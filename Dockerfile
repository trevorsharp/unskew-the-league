FROM oven/bun:1-alpine AS base
WORKDIR /app

# Build static UI
FROM base AS build

COPY ui/package.json ui/bun.lock ./
RUN bun install --frozen-lockfile
COPY ./ui .
ENV NODE_ENV=production
RUN bun run build

# Compose release container
FROM base AS release

COPY package.json bun.lockb* ./
RUN bun install --frozen-lockfile --production
COPY --from=build /static ./static
COPY ./src ./src

# Run application
EXPOSE 3001/tcp
CMD bun run start
