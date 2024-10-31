const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

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

// Forgot Password
exports.forgotPassword = async (req, res) => {
    const { email } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }

        // Token reset password 
        const resetToken = jwt.sign({ user_id: user.user_id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Link to save password
        const resetLink = `${process.env.CLIENT_URL}/reset-password?token=${resetToken}`;

        // Config Nodemailer
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS  
            }
        });

        // send email
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Password Reset Request',
            html: `<p>Click <a href="${resetLink}">here</a> to reset your password. This link will expire in 1 hour.</p>`
        });

        res.json({ msg: 'Password reset link has been sent to your email' });
    } catch (error) {
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

