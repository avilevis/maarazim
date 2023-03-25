FROM node:19-alpine

# Create app directory
RUN mkdir app
WORKDIR /app
COPY . /app/.

RUN npm install

EXPOSE 10000
RUN npm run build
RUN npm run start