# Install dependencies only when needed
FROM node:16-alpine AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

FROM node:16-alpine AS builder
WORKDIR /app
COPY . .
COPY --from=deps /app/node_modules ./node_modules
COPY ./server.js .
ENV API_URL https://app.sshvps.ru
ENV VNC_HOST vnc.sshvps.ru
ENV LANDING_URL https://sshvps.ru

RUN npm run build

FROM node:16-alpine AS runner
WORKDIR /app

ENV NODE_ENV production
EXPOSE 80
CMD ["node", "./server.js"]
