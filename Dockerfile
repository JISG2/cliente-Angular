# Installs the current application on a Node Image.
FROM node:10.5
# set working directory
RUN mkdir /usr/src/app
WORKDIR /usr/src/app
# add `/usr/src/app/node_modules/.bin` to $PATH
ENV PATH /usr/src/app/node_modules/.bin:$PATH
# install and cache app dependencies
COPY package.json /usr/src/app/package.json
RUN npm install
# add app
COPY . /usr/src/app
EXPOSE 4200
# start app
CMD npm start