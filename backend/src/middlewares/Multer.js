const multer = require('multer');

const storage = (folder) => multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, `public/images/${folder}/original`);
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

const upload = (folder) => multer({
    storage: storage(folder),
    limits: {
        fileSize: 1024 * 1024 * 10 // max 10MB
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

const uploadAvatars = upload('avatars').single('photoFile');
const uploadAdverts = upload('adverts').single('photoFile');

module.exports = {
    uploadAvatars,
    uploadAdverts
}