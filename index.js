
//инициализация серверав и других зависимостей
const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const PORT = process.env.PORT || 5000
const sendRouter = require('./sendRouter')
const app = express();


//настройка cors
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'https://master--alexsoftsite.netlify.app');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Credentials', true);
  // Помните, использование звёздочек в качестве маски может быть рискованным.
  next();
});

//Подключенеие зависимостей и роутов
app.use(express.json());
app.use('/send', sendRouter)


//Функция запуска сервера
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