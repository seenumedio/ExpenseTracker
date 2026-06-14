const jwt = require('jsonwebtoken');
const User = require('../models/User');

// gen signed token with userID, secret
const generateToken = (userId) => {
    return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

exports.signup = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;

        // check for dup email
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: 'Email already registered'
            });
        }
        // Create user (pass gets hashed by pre-save hook)
        const user = await User.create({ name, email, password });
        const token = generateToken(user._id);

        res.status(201).json({
            success: true,
            data: { token, user: { id: user._id, name: user.name, email: user.email } },
        });
    } catch (err) {
        next(err);
    }
};

exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body
        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'Invalid email or password',
            });
        }
        // Verify pass against stored hash
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ success: false, message: 'Invalid email or password' });
        }

        const token = generateToken(user._id);
        res.json({
            success: true,
            data: { token, user: { id: user._id, name: user.name, email: user.email } },
        });
    } catch (err) {
        next(err);
    }
}