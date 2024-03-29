const nodemailer = require('nodemailer');



const sendEmail = async (req, res) => {
    const {customer_name,
    customer_phone,
    customer_email,
    select_theme,
    body_question} = req.body.contactinfo;


    function main() {
        // create reusable transporter object using the default SMTP transport
        const transporter = nodemailer.createTransport({
          host: 'smtp.mail.ru',
          port: 465,
          secure: true, // true for 465, false for other ports
          auth: {
            user: 'igor-polnikov@mail.ru',
            pass: 'FRZwJXSj3JFF9dTDhqNQ',
          },
        });
        // send mail with defined transport object
        const info = transporter.sendMail({
          from: '"Онлаин Магазин" <igor-polnikov@mail.ru>', // sender address
          to: 'igor-polnikov@mail.ru', // list of receivers
          subject: 'Тема', // Subject line
          text: 'Текст:', // plain text body
          html: `<b><p>С вами хочет связатся - ${customer_name} <p><br /> Контактная иформация - <br /> Email: ${customer_email} <br /> Телефон: ${customer_phone}.</br>
          <p>По теме - ${select_theme}</p>
          <p>Вопрос - ${body_question}.</p>`, // html body
        });

      }
      
      main();
      res.sendStatus(200);
  };

  module.exports = {sendEmail}
