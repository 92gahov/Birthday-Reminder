const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const PORT = process.env.PORT || 5000;
mongoose.set('strictQuery', false);

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use('/api/birthdays', require('./routes/birthdaysRoutes'));
app.use('/api/users', require('./routes/userRoutes'));

app.use(express.static(path.join(__dirname, "./client/build")));
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "./client/build/index.html"),
        (err) => { res.status(500).send(err) });
});

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DB_URL);
        console.log("MongoDB Connected!");
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};

connectDB().then(() => {
    app.listen(PORT, () => console.log(`Listenning on port ${PORT}...`))
});
