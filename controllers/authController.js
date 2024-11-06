const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const nodemailer = require('nodemailer');
const sendEmail = require('../configs/mailer');

// Sign up
exports.signup = async (req, res) => {
    const { name, email, phone, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ msg: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        user = new User({
            user_id: `user_${new Date().getTime()}`,
            name,
            email,
            phone,
            password: hashedPassword,
        });


        // save into DB
        await user.save();

        const token = jwt.sign({ user_id: user.user_id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(201).json({ token, user_id: user.user_id });
    } catch (error) {
        res.status(500).json({ msg: 'Server error' });
    }
};

// Login
exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: 'Email Not found ' });
        }

        // compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Password Wrong' });
        }

        // return token and user ID 
        const token = jwt.sign({ user_id: user.user_id }, process.env.JWT_SECRET, { expiresIn: '24h' });

        res.json({ token, user_id: user.user_id });
    } catch (error) {
        res.status(500).json({ msg: 'Server error' });
    }
};

exports.forgotPassword = async (req, res) => {
    const { email } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }
 
        // Generate a new random password
        const newPassword = Math.random().toString(36).slice(-8);

        // Hash password
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        await user.save();

        // Send password to email
        const subject = 'Road Watcher - Your New Password';
        const text = `Your new password is: ${newPassword}. Please log in and change your password immediately.`;

        await sendEmail(email, subject, text);

        res.json({ msg: 'New password has been sent to your email' });
    } catch (error) {
        console.error('Error in forgotPassword:', error);
        res.status(500).json({ msg: 'Server error' });
    }
};

// Reset Password
exports.resetPassword = async (req, res) => {
    const { token, newPassword } = req.body;
    try {
        // Xác thực token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findOne({ user_id: decoded.user_id });
        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }

        // encoding password
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // update password in DB
        user.password = hashedPassword;
        await user.save();

        res.json({ msg: 'Password reset successfully' });
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(400).json({ msg: 'Token has expired' });
        }
        res.status(500).json({ msg: 'Server error' });
    }
};

