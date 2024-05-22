const nodemailer = require('nodemailer');
class sendController {
  async contactForm(req, res) {
    const transporter = nodemailer.createTransport({
     host: "smtp.mail.ru",
     port: 465,
     secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
      },
      tls: {
        rejectUnauthorized: false,
    },
    });

    const {email, name, surname, patronomic, goodOne, goodTwo, goodThree, goodFour, goodFive, goodSix} = req.body

    const mailOptions = {
      from: "ооо 'АлекСофт' <elena-ivanova-1757@mail.ru>",
      to: "elena-ivanova-1757@mail.ru",
      subject: "заказ",
      text: `Имя: ${name}\nФамилия: ${surname}\nОтчество: ${patronomic}\nEmail: ${email} \nЗаказ: ${goodOne}, ${goodTwo}, ${goodThree}, ${goodFour}, ${goodFive}, ${goodSix} \nСтатус: заказ оформлен`
    };

    try {
       transporter.sendMail(mailOptions);
      res.status(200).json({ message: 'Email sent successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error sending email' });
    }
  }
}

module.exports = new sendController();