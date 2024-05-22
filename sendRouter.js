const Router = require('express');
const router = new Router();
const controller = require('./sendController')

router.post('/contact', controller.contactForm);
module.exports = router;