FROM node:18-alpine

WORKDIR /app

#  copy package.json, install packages and copy sources
COPY package*.json ./
RUN npm install
COPY . .

# run lint and prettier
RUN npm run lint && npm run prettier-format

# start server, run tests, terminate server
RUN npm run start & 
RUN lsof -i -P -n | grep LISTEN
RUN npm run test
RUN kill $(jobs -p)

CMD ["npm", "run","start"]
