const jwt = require('jsonwebtoken');
const User = require('../models/UserModel');

const protect = async (req, res, next) => {
    let token;
    if (req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.SECRET, (err, res) => {
                if (err) {
                    return "token expired";
                }
                return res;
            });
            if (decoded == "token expired") {
                return res.status(400).json({ error: "Token expired!" });
            }
            req.user = await User.findById(decoded.id).select('-password');
            next();
        } catch (error) {
            res.status(401).json({ error: 'Not authorized!' });
        }
    }
    if (!token) {
        res.status(401).json({ error: 'Not authorized, no token!' });
    }
};

module.exports = { protect };