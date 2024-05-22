const Router = require('express');
const router = new Router();
const controller = require('./authController')
const { check } = require('express-validator')

router.post('/registration', [check('username', "Логин пользователя не может быть пустым").notEmpty(),
check('name', "Имя пользователя не может быть пустым").notEmpty(),
check('surname', "Фамилия пользователя не может быть пустым").notEmpty(),
check('password', "Пароль не может быть короче 4 символов и длинее 15 символов").isLength({ min: 4, max: 15 }),
check('email', "Неверный формат email").isEmail()
], controller.registration)
router.post('/login', controller.login)
router.post('/logout', controller.logout)
router.get('/user/me', controller.getUser)

module.exports = router;