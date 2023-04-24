const { uploadFileToCloudinary } = require('../../utils/cloudinary');
const College = require('../../models/CollegeModel');
const Program = require('../../models/ProgramModel');
const School = require('../../models/schoolModel');
const AppError = require('../../utils/appError');
const catchAysnc = require('../../utils/catchAysnc');
const cloudinary = require('../../utils/cloudinary');

exports.createSchool = catchAysnc(async (req, res, next) => {
  const { title, programs, colleges, description } = req.body;
  const files = req.file.path;

  const result = await cloudinary.uploader.upload(files, {
    folder: 'school-images',
  });
  if (!result || !result.secure_url)
    return next(new AppError('No image found', 403));
  const programObjects = programs.map((program) => {
    return new Program({
      title: program.title,
    });
  });

  const collegeObjects = colleges.map((college) => {
    return new College({
      name: college.name,
      description: college.description,
    });
  });

  const school = await School.create({
    title,
    image: result.secure_url,
    description,
    programs: programObjects,
    colleges: collegeObjects,
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
