FROM node:16.3.0-alpine
WORKDIR /app
COPY package.json /app/package.json
RUN npm install --only=prod
COPY . /app
RUN npm run build
EXPOSE 80
CMD [ "node", "server.js" ]
