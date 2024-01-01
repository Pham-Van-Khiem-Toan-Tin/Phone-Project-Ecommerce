const nodemailer = require("nodemailer");
const sendgridTransport = require("nodemailer-sendgrid-transport")
//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
const sendEmail = async (options) => {
  const transporter = nodemailer.createTransport(sendgridTransport({
    auth: {

      api_key: "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"
    }
  }));
  var mailOptions = {
    to: options.email,
    from: 'phamkhiem2001@hotmail.com',
    subject: options.subject,
    text: options.message,
  };
  console.log("chay den day");
  await transporter.sendMail(mailOptions, function(err, res) {
    if(err) {
      console.log(err);
    }
    console.log(res);
  });
};

module.exports = sendEmail;
