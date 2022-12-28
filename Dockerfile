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
RUN mkdir -p /home/app-frontend/
WORKDIR /home/app-frontend

COPY package*.json ./

COPY --from=BUILD_IMAGE /home/app-frontend/node_modules ./node_modules
COPY --from=BUILD_IMAGE /home/app-frontend/package.json ./
COPY --from=BUILD_IMAGE /home/app-frontend/package-lock.json ./
COPY --from=BUILD_IMAGE /home/app-frontend/public ./public
COPY --from=BUILD_IMAGE /home/app-frontend/.next ./.next



CMD ["npm", "start"]
