const User = require('../Model/userModel');
const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);



exports.createNewUser = (req, res) => {
  
  var newUser = new User();
  newUser.email = req.body.email;
  newUser.name = req.body.name;
  newUser.setPassword(req.body.password);
  
  User.findOne({email: req.body.email}, (err, user)  => {
    if(user) {
      return res.status(200).send({ message: "User already exist"})
    }else if(err) {
      return res.status(500).send(err);
    }else {
      User.create(newUser, function (err, user) {
        if (err) {
          return res.status(500).send(err);
        }else if(user){
          const msg = {
            to: user.email,
            from: 'support@lakshmananarumugam.com',
            subject: 'Sending with SendGrid is Fun',
            text: 'Congratulations! You have successfuly joined Workafy family. Please confirm your mail to validate your account.',
            html: '<strong>Congratulations! You have successfuly joined Workafy family. Please confirm your mail to validate your account. We would like to hear from you. For any query, comments and suggestions mail us at contact@lakshmanan@arumugam.com</strong>'
          };          
          
          sgMail
            .send(msg)
            .then(() => {
              res.status(200).send(user);
            }, error => {
              console.error(error);
          
              if (error.response) {
                console.error(error.response.body)
              }
            });
        }
      });
    }
  })
};


exports.authExistUser = (req, res) => {

  User.findOne({email: req.body.email}, function (err, user) {
      if (err) {
        return res.status(500).send("There was a problem adding the information to the database.");
      } else if (user === null) {
        return res.status(400).send("User not found");
      } else {
        if (user.validPassword(req.body.password)) { 
          return res.status(201).send({ 
            message : "User Logged In", 
          }) 
        } 
        else { 
          return res.status(400).send({ 
              message : "Wrong Password"
          }); 
        } 
      }
      res.status(200).send(user);
  });
};
