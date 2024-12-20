const express = require('express');
const { signup, 
    login,
    forgotPassword,
    resetPassword,
    googleLogin,
    googleCallback } = require('../controllers/authController');
const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);

router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);

// Google OAuth routes
router.get('/google', googleLogin); 
router.get('/google/callback', googleCallback);

module.exports = router;
