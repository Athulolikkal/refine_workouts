
FROM node:18.17.1

WORKDIR /App

COPY package*.json ./

RUN npm install 

COPY . .

EXPOSE 5173

CMD ["npm", "run", "dev"]

