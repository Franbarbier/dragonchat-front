FROM node:16-alpine

RUN mkdir -p /home/app-frontend/
WORKDIR /home/app-frontend

COPY package*.json ./

COPY . .

RUN npm install
RUN npm run build

#EXPOSE 3000

CMD ["npm", "start"]
