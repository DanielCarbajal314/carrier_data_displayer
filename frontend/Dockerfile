FROM node:20.11.1 AS base
WORKDIR /code
COPY ./package.json ./package.json
COPY ./package-lock.json ./package-lock.json
RUN npm install

FROM base AS development
COPY ./. /code/.
CMD ["npm", "run", "dev"]