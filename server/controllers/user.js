const User = require('../models/user');
const {normalizeErrors} = require('../helpers/mongoose');


exports.auth = function (req, res) {
  const {email, password}  = req.body;
  if (!email || !password) {
    return res.status(400).send({errors: [{title: 'Data missing!', detail: 'Provide email and password'}]});
  }
  User.findOne({email}, function (err, user) {
    if (err) {
      return res.status(500).send({errors: normalizeErrors(err.errors)});
    }
    if (!user) {
      return res.status(400).send({errors: [{title: 'Invalid user!', detail: 'User not exists'}]});
    }
    if (user.isSamePassword(password)) {
      // return JWT
    } else {
      return res.status(403).send({errors: [{title: 'Wrond data!', detail: 'Invalid email or password'}]});
    }
  });
};

exports.register = function (req, res) {
  const {username, email, password, passwordConfirmation}  = req.body;
  if (!email || !password) {
    return res.status(400).send({errors: [{title: 'Data missing!', detail: 'Provide email and password'}]});
  }
  if (password !== passwordConfirmation) {
    return res.status(400).send({errors: [{title: 'Invalid password!', detail: 'Password is not a same as confirmation'}]});
  }
  User.findOne({email}, function (err, existingUser) {
    if (err) {
      return res.status(500).send({errors: normalizeErrors(err.errors)});
    }
    if (existingUser) {
      return res.status(400).send({errors: [{title: 'Invalid email!', detail: 'User with this already exists'}]});
    }
    const user = new User({
      username: username, email: email, password: password
    });
    user.save(function (err) {
      if (err) {
        return res.status(500).send({errors: normalizeErrors(err.errors)});
      }
      return res.json({'registered': true});
    });
  });
};
