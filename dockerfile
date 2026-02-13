FROM node:22.18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 5173

# Cambia el puerto y el comando
CMD ["npm", "run", "dev", "--", "--host"]