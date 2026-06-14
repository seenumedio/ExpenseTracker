const multer = require('multer');
/* Store uploaded files in RAM as Buffer objects
=> for quick access& to avoid memory clutter(happens if hard-written in disk)
*/
const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
    // accept only img files(jpeg, png, etc...)
    if (file.mimetype.startsWith('image/')) {
        cb(null, true);
    } else {
        cb(new Error('Only image files are allowed'), false);
    }
};

// Configure multer with storage, filter, and 5MB size limit
const upload = multer({
    storage,
    fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 },
});

module.exports = upload;