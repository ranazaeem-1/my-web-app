FROM node:16

WORKDIR /app

COPY app/package.json .
RUN npm install

COPY app/ .

EXPOSE 3000

CMD ["npm", "start"]