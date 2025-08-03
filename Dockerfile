FROM oven/bun:1.2.19 AS builder
WORKDIR /app
COPY bun.lockb* package.json ./
RUN bun install
COPY . .
RUN bun run build

FROM nginx:mainline-alpine
COPY --from=builder /app/dist /usr/share/nginx/html
