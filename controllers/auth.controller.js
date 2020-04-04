var db = require('../db');
var md5 = require('md5');

module.exports.login = function(req, res) {
  res.render('auth/login')
};

module.exports.postLogin = function(req, res) {
  const email = req.body.email;
  const password = req.body.password;

  const user = db.get('users').find({ email: email }).value();
  if (!user) {
    res.render('auth/login', {
      errors: [
        'User is not exist.'
      ],
      value: req.body
    });
    return;
  }

  var hashedPassword = md5(password);
  if (user.password !== hashedPassword) {
    res.render('auth/login', {
      errors: [
        'Wrong password.'
      ],
      value: req.body
    });
    return;
  }

  res.cookie('userId', user.id, {
    signed: true
  });
  res.redirect('/users');
}
