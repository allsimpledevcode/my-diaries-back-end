const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const msg = {
  to: 'uilaxman@gmail.com',
  from: 'support@lakshmananarumugam.com',
  subject: 'Sending with SendGrid is Fun',
  text: 'Congratulations! You have successfuly joined Workafy family. Please confirm your mail to validate your account.',
  html: '<strong>Congratulations! You have successfuly joined Workafy family. Please confirm your mail to validate your account. We would like to hear from you. For any query, comments and suggestions mail us at contact@lakshmanan@arumugam.com</strong>'
};

sgMail
  .send(msg)
  .then(() => {
    console.log("Mail Sent")
  }, error => {
    console.error(error);

    if (error.response) {
      console.error(error.response.body)
    }
  });