const Birthday = require('../models/BirthdayModel');

const getBirthdays = async (req, res) => {
    try {
        const birthdays = await Birthday.find({ user: req.user.id });
        res.status(200).json(birthdays);
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: error });
    }
};

const createBirthday = async (req, res) => {
    const { name, celebration, month, day, fullDate } = req.body;
    let emptyFields = [];
    if (!name) {
        emptyFields.push('name');
    }
    if (!celebration) {
        emptyFields.push('title');
    }
    if (!month || !day || !fullDate) {
        emptyFields.push('date');
    }
    try {
        const birthday = await Birthday.create({
            name,
            celebration,
            month,
            day,
            fullDate,
            user: req.user.id
        })
        res.status(200).json(birthday);
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: "Please fill in all fields!", emptyFields });
    }
};

const deleteBirthday = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedBirthday = await Birthday.findOneAndDelete({ _id: id });
        res.status(200).json(deletedBirthday);
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: error });
    }
};

module.exports = {
    getBirthdays,
    createBirthday,
    deleteBirthday
};