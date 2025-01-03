FROM node:alpine

WORKDIR /app
ENV NODE_ENV=production

RUN apk add --no-cache curl bash
RUN curl -fsSL https://bun.sh/install | BUN_INSTALL=/usr bash

COPY package.json ./

RUN bun install

COPY . .

RUN bun run build

CMD bun run start