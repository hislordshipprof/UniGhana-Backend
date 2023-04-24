// const multer = require('multer');
// const sharp = require('sharp');
// const catchAysnc = require('../utils/catchAysnc');
// const AppError = require('../utils/appError');

// const multerStorage = multer.memoryStorage();

// const multerFilter = (req, file, cb) => {
//   if (file.mimetype.startsWith('image')) {
//     cb(null, true);
//   } else {
//     cb(new AppError('Not an image! please upload image', 404), false);
//   }
// };
// const upload = multer({
//   storage: multerStorage,
//   fileFilter: multerFilter,
// });

// console.log('upload', upload);
// exports.uploadUserPhoto = upload.single('image');

// exports.resizeUserPhoto = catchAysnc(async (req, res, next) => {
//   if (!req.file) return next();
//   req.file.filename = `user-${req.user.id}-${Date.now()}.jpeg`;
//   await sharp(req.file.buffer)
//     .resize(500, 500)
//     .toFormat('jpeg')
//     .jpeg({ quality: 90 })
//     .toFile(`public/img/users/${req.file.filename}`);
//   next();
// });
const multer = require('multer');

// set storage engine
module.exports = multer({
  storage: multer.diskStorage({}),

  fileFilter: (req, file, cb) => {
    // reject a file
    if (
      file.mimetype === 'image/jpeg' ||
      file.mimetype === 'image/png' ||
      file.mimetype === 'image/jpg' ||
      file.mimetype === 'image/gif' ||
      file.mimetype === 'image/svg+xml' ||
      file.mimetype === 'image/webp' ||
      file.mimetype === 'image/bmp' ||
      file.mimetype === 'image/tiff' ||
      file.mimetype === 'image/vnd.microsoft.icon' ||
      file.mimetype === 'image/vnd.wap.wbmp' ||
      file.mimetype === 'image/x-icon' ||
      file.mimetype === 'image/x-jng'
    ) {
      cb(null, true);
    } else {
      cb(
        {
          message: 'File type not supported',
        },
        false
      );
    }
  },
});
