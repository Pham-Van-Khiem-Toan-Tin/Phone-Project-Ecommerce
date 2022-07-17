const nodemailer = require("nodemailer");

const sendEmail = async (options) => {
  const transporter = nodemailer.createTransport({
    host: "hotmail",
    auth: {
      user: "phamkhiemhust2001@hotmail.com",
      pass: "Khiemdaica2001",
    },
    port: 465,
    secure: true,
  });
  const mailOptions = {
    from: "phamkhiemhust2001@hotmail.com",
    to: options.email,
    subject: options.subject,
    text: options.message,
  };
  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
