FROM node:16-alpine AS deps
RUN apk add --no-cache libc6-compat
RUN yarn cache clean
WORKDIR /app

COPY package*.json ./
COPY yarn.lock ./
RUN yarn set version 3.6.1
RUN yarn install
COPY . .


FROM node:16-alpine AS builder
WORKDIR /app
COPY --from=deps /app ./
RUN yarn install
RUN yarn build


FROM node:16-alpine AS runner
WORKDIR /app
ENV NODE_ENV production

COPY --from=builder /app/package*.json ./
COPY --from=builder /app/yarn.lock ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
RUN yarn install --production
#RUN npm install next

CMD ["yarn", "start"]