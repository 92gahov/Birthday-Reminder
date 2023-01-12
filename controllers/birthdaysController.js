const Birthday = require('../models/BirthdayModel');

const getBirthdays = async (req, res) => {
    const birthdays = await Birthday.find({ user: req.user.id });
    res.status(200).json(birthdays);
};

const createBirthday = async (req, res) => {
    let emptyFields = [];
    if (!req.body.name) {
        emptyFields.push('name');
    }
    if (!req.body.celebration) {
        emptyFields.push('title');
    }
    if (!req.body.month || !req.body.day || !req.body.fullDate) {
        emptyFields.push('date');
    }
    try {
        const birthday = await Birthday.create({
            name: req.body.name,
            celebration: req.body.celebration,
            month: req.body.month,
            day: req.body.day,
            fullDate: req.body.fullDate,
            user: req.user.id
        });
        res.status(200).json(birthday);
    } catch (error) {
        res.status(400).json({ error: "Please fill in all fields!", emptyFields });
    }
};

const deleteBirthday = async (req, res) => {
    const { id } = req.params;
    const birthday = await Birthday.findByIdAndDelete({ _id: id });
    if (!birthday) {
        res.status(404).json({ error: "Birthday not found!" });
    } else if (!req.user) {
        res.status(400).json({ error: "User not found!" });
    } else {
        res.status(200).json(birthday);
    }
};

module.exports = {
    getBirthdays,
    createBirthday,
    deleteBirthday
};