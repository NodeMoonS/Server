const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const PORT = process.env.PORT || 5000
const sendRouter = require('./sendRouter')
const app = express();

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'https://66520e92015cdf57aa9009b3--elegant-puppy-f91da4.netlify.app');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Credentials', true);
  // Помните, использование звёздочек в качестве маски может быть рискованным.
  next();
});


app.use(express.json());
app.use('/send', sendRouter)

const start = async () => {
  try {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });

  } catch (error) {
    console.log(error);
  }
}

start();