const express = require('express');
const { getBirthdays, createBirthday, deleteBirthday } = require('../controllers/birthdaysController');
const { protect } = require('../middleware/requireAuth');

const router = express.Router();

router.get('/', protect, getBirthdays);
router.post('/', protect, createBirthday);
router.delete('/:id', protect, deleteBirthday);

module.exports = router;