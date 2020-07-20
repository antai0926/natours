const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });
const https = require('https');
const fs = require('fs');
const app = require('./app');

const DB = process.env.DATABASE_ATLAS.replace(
  '<PASSWORD>',
  process.env.DATABASE_ATLAS_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('DB connection successful!');
  });

// console.log(process.env);
const port = process.env.PORT || 8000;

const server = app.listen(port, () => {
  console.log(`app running on port ${port}`);
});

//cert
// const hskey = fs.readFileSync('./cert/localhost.key', 'utf8');
// const hscert = fs.readFileSync('./cert/localhost.crt', 'utf8');

// const credentials = {
//   key: hskey,
//   cert: hscert,
// };

// const server = https.createServer(credentials, app).listen(port, function () {
//   console.log(`Express https server listening on port  ${port}`);
// });

process.on('unhandledRejection', (err) => {
  console.log('Unhadler Rejection! Shutting Down Server...');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});

process.on('uncaughtException', (err) => {
  console.log('Uncaught Exception! Shutting Down Server...');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
