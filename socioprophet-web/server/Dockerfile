# Server Dockerfile

# pull official base image
FROM node:18-alpine

# set working directory
WORKDIR /usr/src/app/sp-server

# copy package.json from host to current location in alpine image
COPY package.json .

# install dependencies inside image filesystem
RUN yarn

# describes which port the container is listening on at runtime
EXPOSE 5001

# run command in the container
CMD [ "yarn", "start" ]

# copy over rest of source code from host to image filesystem
COPY . .

