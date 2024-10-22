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
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        // compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        // return token and user ID 
        const token = jwt.sign({ user_id: user.user_id }, process.env.JWT_SECRET, { expiresIn: '24h' });

        res.json({ token, user_id: user.user_id });
    } catch (error) {
        res.status(500).json({ msg: 'Server error' });
    }
};
