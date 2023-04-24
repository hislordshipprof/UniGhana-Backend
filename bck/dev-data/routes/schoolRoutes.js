const express = require('express');
const { createSchool } = require('../controllers/schoolController');
const upload = require('../../middleware/multer');
const router = express.Router();

router.route('/createschool').post(upload.single('image'), createSchool);

module.exports = router;
