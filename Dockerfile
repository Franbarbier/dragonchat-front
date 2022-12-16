FROM node:16-alpine AS BUILD_IMAGE

RUN mkdir -p /home/app-frontend/
WORKDIR /home/app-frontend

COPY package*.json ./

COPY . .

RUN yarn install
RUN yarn run build
RUN rm -rf node_modules
RUN yarn install --production


FROM node:16-alpine
ENV NODE_ENV production
RUN mkdir -p /usr/app/
WORKDIR /usr/app

RUN mkdir -p /home/app-frontend/
WORKDIR /home/app-frontend

COPY package*.json ./

COPY --from=BUILD_IMAGE /usr/app/node_modules ./node_modules
COPY --from=BUILD_IMAGE /usr/app/package.json ./
COPY --from=BUILD_IMAGE /usr/app/package-lock.json ./
COPY --from=BUILD_IMAGE /usr/app/public ./public
COPY --from=BUILD_IMAGE /usr/app/.next ./.next



CMD ["npm", "start"]
