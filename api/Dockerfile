FROM node:8 AS api-base
# Create app directory
WORKDIR /usr/src/app
# Install app dependencies
COPY package*.json ./
#RUN npm install
# If you are building your code for production
RUN npm ci --only=production
# Bundle app source
COPY . .


FROM api-base AS prod
EXPOSE 3000
CMD [ "npm", "start" ]
