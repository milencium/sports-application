# Base image
FROM node:16

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY  tsconfig.json /. .env /. prisma ./prisma package*.json ./

RUN npm install

COPY . .

RUN npx prisma generate

RUN npm run build

CMD [ "node", "dist/src/main.js" ]