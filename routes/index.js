var express = require('express');
var router = express.Router();
const multer = require('multer')
// const upload = multer({dest: 'uploads/'})
/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'Home', message: ''});
});

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, uniqueSuffix + '-' + file.fieldname)
    },
})

const uploadFilter = function(req, file, cb) {
        if ( file.mimetype==="image/jpeg") {
            cb(null, true);
        } else {
            return cb(new Error("Only .jpg format allowed!"));
        }
}

const upload = multer({
    storage: storage,
    fileFilter:uploadFilter,
    limits: {
        fileSize: 2 * 1024 * 1024
    },

}).array('avatar', 5)

router.post('/upload', function (req, res, next) {
    upload(req, res, function (err) {
        if (err) {
            res.render('index', {message: err.message})
        } else {
            console.log(req.files)
            res.render('index', {message: 'Tải file thành công!!!'})
        }
    })

});

module.exports = router;
