const router = require('express').Router()
const fs = require('fs')
const multer = require("multer")

const DIR = './texts'

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, DIR);
    },
    filename: (req, file, cb) => {
        const fileName = file.originalname.toLowerCase().split(' ').join('-');
        cb(null, fileName)
    }
});

var upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "application/json" || file.mimetype == "text/plain") {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('Only .json and .text format allowed!'));
        }
    }
});

router.get('/text/:text', async (req, res) => {
    const text = req.params.text
    try {
        const json = require('./texts/' + text + '.json')
        res.send(json.text).status(200)
    } catch (err) {
        res.send(err).status(404)
    }

})
router.get('/textListe', async (req, res) => {
    try {
        var files = fs.readdirSync('./texts');
        res.send(files).status(200)
    } catch (err) {
        res.send(err).status(404)
    }
})

router.post('/multiple-files', upload.array('files', 10), (req, res) => {
    res.send('file sent').status(200)
})

router.delete('/delete-file/:file', (req, res) => {
    console.log("delete")
    const file = req.params.file
    console.log(file)
    fs.unlink('texts/' + file, function (err) {
        if (err) throw err;
        // if no error, file has been deleted successfully
        res.send("file deleted").status(200)
    });  
})


module.exports = router