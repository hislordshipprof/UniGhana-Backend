const { uploadFileToCloudinary } = require('../../utils/cloudinary');
const College = require('../../models/CollegeModel');
const Program = require('../../models/ProgramModel');
const School = require('../../models/schoolModel');
const AppError = require('../../utils/appError');
const catchAysnc = require('../../utils/catchAysnc');
const cloudinary = require('../../utils/cloudinary');
const factory = require('../controllers/handlerFactory');

exports.createSchool = catchAysnc(async (req, res, next) => {
  const { title, programs, colleges, description } = req.body;
  const files = req.file.path;

  const result = await cloudinary.uploader.upload(files, {
    folder: 'school-images',
  });
  if (!result || !result.secure_url)
    return next(new AppError('No image found', 403));

  const programObjects = programs.map(async (program) => {
    const newProgram = new Program({
      title: program.title,
    });
    await newProgram.save();
    return newProgram;
  });

  const collegeObjects = colleges.map(async (college) => {
    let collegeDescription = college.description;
    if (Array.isArray(college.description)) {
      collegeDescription = college.description.join('\n');
    }

    const newCollege = new College({
      name: college.name,
      description: collegeDescription,
    });

    await newCollege.save();
    return newCollege;
  });

  const [savedPrograms, savedColleges] = await Promise.all([
    Promise.all(programObjects),
    Promise.all(collegeObjects),
  ]);

  const school = await School.create({
    title,
    image: result.secure_url,
    description,
    programs: savedPrograms,
    colleges: savedColleges,
  });

  if (!school) {
    return next(new AppError('No school found', 404));
  }

  res.status(200).json({
    status: 'success',
    message: 'School created successfully',
    data: [school],
  });
});

exports.getSchools = catchAysnc(async (req, res, next) => {
  const newschool = await School.find({}).populate('programs colleges');

  if (newschool.length === 0) {
    return next(new AppError('No schools found', 404));
  }

  res.status(200).json({
    status: 'success',
    data: newschool,
  });
});
