const User = require('../models/UserModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const validator = require('validator');

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.SECRET, { expiresIn: '30d' })
};

const signupUser = async (req, res) => {
    const { name, email, password } = req.body;
    const userExists = await User.findOne({ email });
    if (!name || !email || !password) {
        res.status(400).json({ error: 'All fields must be filled!' });
    } else if (!validator.isEmail(email)) {
        res.status(400).json({ error: 'Email is not valid!' });
    } else if (userExists) {
        res.status(400).json({ error: 'Email already in use!' });
    } else {
        const salt = await bcrypt.genSalt(10);
        const hashedPsw = await bcrypt.hash(password, salt);
        const user = await User.create({ name, email, password: hashedPsw });
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })
    }
};

const loginUser = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!email || !password) {
        res.status(400);
        res.status(400).json({ error: 'All fields must be filled!' });
    } else if (user && (await bcrypt.compare(password, user.password))) {
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })
    } else {
        res.status(400).json({ error: 'Invalid credentials!' });
    }
};

module.exports = {
    signupUser,
    loginUser
};