FROM node:14.17.3 as build
RUN mkdir -p /app

WORKDIR /app

COPY . /app

RUN npm install
RUN npm run build --prod

CMD ["npm", "start"]