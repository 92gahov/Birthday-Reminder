const mongoose = require('mongoose');

const birthdaySchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    name: {
        type: String,
        required: true
    },
    celebration: {
        type: String,
        required: true
    },
    month: {
        type: String,
        required: true
    },
    day: {
        type: Number,
        required: true
    },
    fullDate: {
        type: String,
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Birthday', birthdaySchema);
