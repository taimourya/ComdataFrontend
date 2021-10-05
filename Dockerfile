FROM node as build
RUN mkdir -p /app

WORKDIR /app

COPY . /app

RUN npm install
RUN npm run build --prod

CMD ["npm", "start"]