FROM node
MAINTAINER jaga santagostino <kandros5591@gmail.com>

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json /usr/src/app
RUN npm install
COPY . /usr/src/app

ENV NODE_ENV production
ENV MONGO_URL mongodb://svctodo:1234567@52.26.66.166:27017/todo-v2
ENV SECRET T@5kM4nag3R

EXPOSE 80
CMD ["npm", "run", "bs"]

