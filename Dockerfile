FROM node:10

WORKDIR /usr/src/internet-banking

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["node", "index.js"]
