const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

process.on('uncaughtException', (err) => {
  console.log(err.name, err.message);
  console.log('UNCAUGHT EXCEPTION! 💥 Shutting down ...');
  process.exit(1);
});

const app = require('./app');
// console.log(process.env);

// const DB = process.env.DATABASE.replace(
//   '<PASSSWORD>',
//   process.env.DATABASE_PASSWORD
// );

mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: true,
  })
  .then(() => console.log('DB connection successfull !'));

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`App running on port ${port} ...`);
});

process.on('unhandledRejection', (err) => {
  console.log(err.name, err.message);
  console.log('UNHANDLED REJECTION! 💥 Shutting down ...');
  server.close(() => {
    process.exit(1);
  });
});

// of the config.env file (not working)

// "start:dev": "nodemon server.js",
// after this run "npm run start:dev"

// "start:prod": "NODE_ENV=production nodemon server.js"
// after this run "npm run start:prod"
