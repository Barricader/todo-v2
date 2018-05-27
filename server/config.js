const config = {
  mongoURL: process.env.MONGO_URL || 'mongodb://db:27017/todo-v2',
  port: process.env.PORT || 80,
  secret: process.env.SECRET || 'T@5kM4nag3R',
};

export default config;
