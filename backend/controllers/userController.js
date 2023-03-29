const User = require('../models/UserModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const validator = require('validator');

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.SECRET, { expiresIn: 10 })
};

const signupUser = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        if (!name || !email || !password) {
            return res.status(400).json({ error: 'All fields must be filled!' });
        }
        if (!validator.isEmail(email)) {
            return res.status(400).json({ error: 'Email is not valid!' });
        }
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ error: 'Email already in use!' });
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPsw = await bcrypt.hash(password, salt);
        const user = await User.create({ name, email, password: hashedPsw });
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: error });
    }
};

const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        if (!email || !password) {
            return res.status(400).json({ error: 'All fields must be filled!' });
        }
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: "Invalid email or password!" });
        }
        const correctPsw = await bcrypt.compare(password, user.password);
        if (!correctPsw) {
            return res.status(400).json({ error: "Invalid email or password!" });
        }
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: error });
    }
};

module.exports = {
    signupUser,
    loginUser
};