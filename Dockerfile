FROM node:18-alpine

WORKDIR /app
ENV LOGGER_TYPE='json'
#  copy package.json, install packages and copy sources
COPY package*.json ./
RUN npm install
COPY . .

# run lint and prettier
RUN npm run lint && npm run prettier-format

# start server, run tests, terminate server
RUN sh ./scripts/tests.sh


CMD ["npm", "run","start"]
