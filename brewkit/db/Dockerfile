FROM node:10-alpine

RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app
WORKDIR /home/node/app
COPY package*.json ./
USER node
COPY --chown=node:node . .
RUN npm install
# Not sure why i need this, it won't install with npm install and says to install manually... weird
RUN npm install sqlite3

CMD ["npm", "run", "dev"]
