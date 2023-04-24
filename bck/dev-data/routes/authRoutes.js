const express = require('express');
const {
  signUp,
  login,
  resetPassword,
  forgotPassword,
} = require('../controllers/authController');

const router = express.Router({ mergeParams: true });

//protect all routes
router.route('/register').post(signUp);
router.route('/login').post(login);
router.patch('/resetPassword/:token', resetPassword);

router.post('/forgotPassword', forgotPassword);
module.exports = router;
