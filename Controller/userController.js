const User = require('../Model/userModel');

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
          res.status(200).send(user);
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
