const { createTransport } = require("nodemailer");
require("dotenv").config();
console.log(process.env);
 const sendMessage = async (code, toMail, subject = "Confirm Code") => {
  let transporter = createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  });
  let info = await transporter.sendMail({
    from: process.env.MAIL_USER,
    to: toMail,
    subject: subject,
    text: "Hello word",
    html: `<code style='fontsize: 32px;'><b>${code}</b> </code>`,
  });
  return info;
};

module.exports = {
    sendMessage: sendMessage,
};
