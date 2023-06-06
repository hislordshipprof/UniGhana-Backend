const express = require('express');
const { createSchool, getSchools } = require('../controllers/schoolController');
const upload = require('../../middleware/multer');
const router = express.Router();

router.route('/createschool').post(upload.single('image'), createSchool);
router.route('/').get(getSchools);
module.exports = router;
