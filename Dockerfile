FROM node:10-alpine

RUN mkdir -p /
WORKDIR /

COPY package.json ./
RUN npm install

COPY . .

EXPOSE 5000
CMD ["source", ".env", "&&","npm", "start"]