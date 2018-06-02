FROM node

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json /usr/src/app
RUN npm install
COPY . /usr/src/app

ENV NODE_ENV production
ENV PORT 80
ENV MONGO_URL mongodb://172.31.26.90:27017/todo-v2
ENV SECRET T@5kM4nag3R

EXPOSE 80
CMD ["npm", "run", "bs"]
