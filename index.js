const express = require('express')
const app = express()
const port = 3000
const multer  = require('multer');
const path = require('path');


const storage = multer.diskStorage({
    destination: (req, file,cb) => {
        cb(null, 'public/images/uploads');
    },
    filename: (req, file, cb) => {
        console.log(file);
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const fileFilter = (req, file,cb) => {
    if (file.mimetype == 'image/jpeg' || file.mimetype == 'image/png' ){
        cb(null, true);
    } else if (file.mimetype == 'application/pdf') {
        cb(null, true);
    }
}
const upload = multer({ storage: storage, fileFilter: fileFilter });
//Upload route
app.post('/upload/images', upload.single('image'), (req, res, next) => {
    try {
        return res.status(201).json({
            message: 'File uploded successfully'
        });
    } catch (error) {
        console.error(error);
    }
});


app.listen(port, () => console.log(`Hello world app listening on port ${port}!`));