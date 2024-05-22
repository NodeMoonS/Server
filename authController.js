const User = require('./models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');

class authController {
  async registration(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ message: "Ошибки при регистрации", errors })
      }
      const { username, name, surname, email, patronymic, password } = req.body
      const candidate = await User.findOne({ username })
      if (candidate) {
        return res.status(400).json({ message: 'Пользователь с таким username уже существует' })
      }
      const hashPass = bcrypt.hashSync(password, 7);
      const user = new User({ username, name, surname, email, patronymic, password: hashPass })
      await user.save()
      return res.json({ message: 'User saved successfully' })

    } catch (error) {
      console.log(error)
      res.status(400).json({ message: error.message });
    }
  }

  async login(req, res) {
    try {
      const { username, password } = req.body
      const user = await User.findOne({ username })
      if (!user) {
        res.status(404).json({ message: `Пользователь ${username} не найден` })
      }
      const validPass = bcrypt.compareSync(password, user.password)
      if (!validPass) {
        res.status(404).json({ message: `Введен не верный пароль` })
      }
      const token = jwt.sign({ _id: user._id }, process.env.SECRET_KEY)

      res.cookie('jwt', token, {
        httpOnly: true,
        maxAge: 168 * 60 * 60 * 1000 // 1 weak
      })

      return res.json({ token })
    } catch (error) {
      console.log(error)
      res.status(400).json({ message: error.message });
    }
  }

  async getUser(req, res) {
    try {
      const cookie = req.cookies['jwt']

      const claims = jwt.verify(cookie, process.env.SECRET_KEY)

      if (!claims) {
        return res.status(401).send({
          message: 'unauthenticated'
        })
      }

      const user = await User.findOne({ _id: claims._id })

      const { password, ...data } = await user.toJSON()

      res.send(data)
    } catch (e) {
      return res.status(401).send({
        message: 'unauthenticated'
      })
    }
  }
  async logout(req, res) {
    res.cookie('jwt', '', { maxAge: 0 })

    res.send({
      message: 'success'
    })
  }
}


module.exports = new authController();