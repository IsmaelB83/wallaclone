const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'public/images/adverts/original');
    },
    filename: (req, file, callback) => {
        let aux = new Date().toLocaleString()
            .replace(new RegExp(' ', 'g'), '')
            .replace(new RegExp('/', 'g'), '')
            .replace(new RegExp(',', 'g'), '')
            .replace(new RegExp(':', 'g'), '');
        callback(null, `${aux}__${file.originalname}`);
    }
})

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5 // max 5MB
    },
    fileFilter: (req, file, callback) => {
        switch (file.mimetype) {
            case 'image/jpeg': 
            case 'image/bmp': 
            case 'image/gif': 
            case 'image/png': 
                return callback(null,true)
            default:
                return callback({
                    status: 422,
                    param: `Mimetype ${file.mimetype}`,
                    msg: 'File not supported'
                });
        }
    }
});

module.exports = upload.single('photoFile');