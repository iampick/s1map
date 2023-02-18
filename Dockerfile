FROM node:16.10.0-alpine
ENV NODE_ENV=production
ENV NODE_OPTIONS=--max_old_space_size=1024
WORKDIR /usr/src/app
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
RUN npm install --force --production --silent && mv node_modules ../
COPY . .
EXPOSE 3100
RUN chown -R node /usr/src/app
USER node
CMD ["npm", "start"]
