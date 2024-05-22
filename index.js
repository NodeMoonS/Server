const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const PORT = process.env.PORT || 5000
const authRouter = require('./authRouter')
const sendRouter = require('./sendRouter')
const cors = require('cors')

const cookieParser = require('cookie-parser')
const app = express();
// app.use(cors());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:5500');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Credentials', true);
  // Помните, использование звёздочек в качестве маски может быть рискованным.
  next();
});



app.use(cookieParser());
app.use(express.json());

app.use('/auth', authRouter)
app.use('/send', sendRouter)

const mongoose = require('mongoose');

const start = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });

  } catch (error) {
    console.log(error);
  }
}

start();