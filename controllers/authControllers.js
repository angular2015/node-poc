const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { ValidationError, UniqueConstraintError } = require('sequelize');
const User = require('../models/users');
// Generate a JWT token
function generateToken(user) {
    return jwt.sign({ id: user.id, username: user.username }, 'your_jwt_secret', { expiresIn: '1h' });
}

// Login function
exports.login = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ where: { username } });
        if (!user) return res.status(400).send('Invalid username or password');

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).send('Invalid username or password');

        // Generate a token
        const token = generateToken(user);
        res.json({ message: 'Login successful!', token });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
};

// Signup function (optional)
exports.signup = async (req, res) => {
    const { username, password, email } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ username, email, password: hashedPassword });

        // Generate a token
        const token = generateToken(user);
        return res.status(201).json({ message: 'User created!', token });
    } catch (error) {
        console.error(error);
        // Handle different error types
        if (error instanceof ValidationError) {
            // Sequelize validation error (e.g., unique constraint violation)
            return res.status(400).json({
                error: {
                    message: 'Validation error',
                    details: error.errors.map(err => err.message), // Array of validation error messages
                }
            });
        } else if (error instanceof UniqueConstraintError) {
            // Handle unique constraint violation specifically for username and email
            return res.status(400).json({
                error: {
                    message: 'User already exists',
                    details: [
                        error.errors.map(err => err.message), // Specific error messages
                    ]
                }
            });
        } else {
            // General server error
            return res.status(500).json({ error: 'Server error' });
        }
    }
};

// Logout function
exports.logout = (req, res) => {
    // Since JWT is stateless, you can simply inform the client to remove the token
    res.json({ message: 'Logged out successfully. Please remove the token from client.' });
};