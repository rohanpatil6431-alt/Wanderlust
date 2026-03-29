const user = require('../models/user');


module.exports.signupForm = (req, res) => {
    res.render('users/signup.ejs');
}
module.exports.signup = async (req, res) => {
    try {
   let { username,email , password } = req.body;
   const newUser = new user({ username, email });
   const registeredUser = await user.register(newUser, password);
   req.login(registeredUser, err => {
    if (err) return next(err);
    req.flash('success', 'Welcome to Wanderlust!');
   res.redirect('/listings');
   });
  
} catch (e) {
    req.flash('error', e.message);
    res.redirect('/users/signup');
}
}

module.exports.renderLoginForm = async (req, res) => {
    res.render('users/login.ejs');
}

module.exports.login =async (req, res) => {
    req.flash('success', 'Welcome back!');
    res.redirect(res.locals.redirectUrl || '/listings');
    
}

module.exports.logout =  (req, res) => {
    req.logout(function (err) {
        if (err) { return next(err); }
        req.flash('success', 'You have logged out!');
        res.redirect('/listings');
    });
}