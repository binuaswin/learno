const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log('Saving file to uploads/');
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const filename = `${uniqueSuffix}${path.extname(file.originalname)}`;
    console.log('Generated filename:', filename);
    cb(null, filename);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.match(/^image\/(jpeg|png|gif|webp)$/)) {
    cb(null, true);
  } else {
    console.error('Invalid file type:', file.mimetype);
    cb(new Error('Only JPEG, PNG, GIF, or WebP images are allowed'), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
});

const uploadMiddleware = (req, res, next) => {
  upload.single('profileImage')(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      console.error('Multer error:', err.message);
      return res.status(400).json({ message: `File upload error: ${err.message}` });
    } else if (err) {
      console.error('Upload error:', err.message);
      return res.status(400).json({ message: err.message });
    }
    console.log('File processed:', req.file || 'No file');
    next();
  });
};

module.exports = uploadMiddleware;