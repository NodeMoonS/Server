//Инициализация роута

const Router = require('express');
const router = new Router();
const controller = require('./sendController')

//Роут отпрпвки письма на почту

router.post('/contact', controller.contactForm);
module.exports = router;