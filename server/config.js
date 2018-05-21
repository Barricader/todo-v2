const config = {
  mongoURL: process.env.MONGO_URL || 'mongodb://localhost:27017/todo-v2',
  port: process.env.PORT || 8000,
  secret: 'T@5kM4nag3R',
};

export default config;
