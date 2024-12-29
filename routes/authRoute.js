const express = require('express');
const { signup, 
    login,
    forgotPassword,
    resetPassword,
    getUserById,
    updateUser,
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


// User routes
router.get('/users/:userId', getUserById);
router.put('/users/:userId', updateUser);

module.exports = router;
