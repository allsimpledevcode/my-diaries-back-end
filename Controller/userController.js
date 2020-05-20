const User = require('../Model/userModel');
const Token = require('../Model/tokenModel');
const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

exports.createNewUser = (req, res) => {
  var newUser = new User();
  newUser.email = req.body.email;
  newUser.name = req.body.name;
  newUser.setPassword(req.body.password);

  User.findOne({
    email: req.body.email
  }, (err, user) => {
    if (user) {
      return res.status(200).send({
        message: "An account already exists for this email.",
        status: 403
      })
    } else if (err) {
      return res.status(500).send(err);
    } else {      
      User.create(newUser, function (err, user) {
        if (err) {
          return res.status(500).send(err);
        } else if (user) {                
          var token = new Token({ userId: user._id, token: user.salt });          
          Token.create(token, function(err, tokenData){
            if (err) { return res.status(500).send({ msg: err.message }); }
            var verifyURL = `http://${req.headers.origin}/verify?token=${tokenData.token}`;
            const msg = {
              to: user.email,
              from: 'support@lakshmananarumugam.com',
              subject: 'Activate your account',
              text: 'Hello,\n\n' + 'Please verify your account by clicking the link: \n\n' + verifyURL,
              html: 'Hello,<br/><br/> Please verify your account by clicking the link: <br/><br/> '+ verifyURL
            };
  
            sgMail
              .send(msg)
              .then(() => {
                res.status(200).send({message: "Please check mail"});
              }, error => {
                res.status(500).send(err);
  
                if (error.response) {
                  res.status(500).send(error.response.body)
                }
              });
          })
        }
      });
    }
  })
};

exports.conformationUser = (req, res) => {
  console.log(req.body);
}

exports.authExistUser = (req, res) => {
  User.findOne({
    email: req.body.email
  }, function (err, user) {
    if (err) {
      return res.status(500).send("There was a problem adding the information to the database.");
    } else if (user === null) {
      return res.status(401).send("User not found");
    } else {
      if (user.validPassword(req.body.password)) {
        return res.status(201).send({
          message: "User Logged In",
        })
      } else {
        return res.status(400).send({
          message: "Wrong Password"
        });
      }
    }
    res.status(200).send(user);
  });
};


exports.forgotUserPassword = (req, res) => {
  User.findOne({
    email: req.body.email
  }, function (err, user) {
    if (err) {
      return res.status(500).send(err);
    } else if (user === null) {
      return res.status(401).send("User not found");
    } else {
      // const msg = {
      //   to: user.email,
      //   from: 'support@lakshmananarumugam.com',
      //   subject: 'Forgot password',
      //   text: 'Congratulations! You have successfuly joined Workafy family. Please confirm your mail to validate your account.',
      //   html: 'Congratulations! You have successfuly joined Workafy family. Please confirm your mail to validate your account. We would like to hear from you. For any query, comments and suggestions mail us at contact@lakshmanan@arumugam.com'
      // };

      // sgMail
      //   .send(msg)
      //   .then(() => {
      //     res.status(200).send(user);
      //   }, error => {
      //     console.error(error);

      //     if (error.response) {
      //       console.error(error.response.body)
      //     }
      //   });
    }
    res.status(200).send(user);
  });
};