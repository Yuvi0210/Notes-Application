const express = require('express')
const router = express.Router()
const fetchuser = require('../middleware/userinfo')
const Files = require('../models/File')
const { validationResult, body } = require('express-validator')
const { json } = require('body-parser')
const upload = require('../middleware/multerstorage')



//Router 1 api/files/uploadfile

router.post('/uploadfile', upload.single('myImage'), fetchuser, [
    body('title', 'Title must be atleast 3 characters in length').isLength({ min: 3 }),
    body('description', 'Description must be atleast 5 characters in length').isLength({ min: 5 })
], async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400), json({ errors: errors.array() })
    }
    try {
        var img = req.body.img
        var encode_img = img.toString('base64')
        var final_img = {
            contentType: 'multipart/form-data',
            image: Buffer.from(encode_img, 'base64')
        }

        const file = new Files({
            user: req.user,
            title: req.body.title,
            description: req.body.description,
            tag: req.body.tag,
            img: ({
                data: final_img.image,
                contentType: final_img.contentType
            })
        })
        const savedFile = await file.save()
        console.log("Saved to Database")
        res.json(savedFile)
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Some internal server error occured")
    }
})

router.get('/getallfiles', fetchuser, async (req, res) => {
    try {
        const files = await Files.find({ user: req.user })
        res.json(files)
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Some internal server error occured")
    }
})

router.delete('/deletefile/:id', fetchuser, async (req, res) => {
    try {
        // Find the file to be deleted and delete it
        let file = await Files.findById(req.params.id)
        if (!file) { return res.status(404).send("Test") }
        if (file.user.toString() !== req.user) { return res.status(401).send("Not Allowed") }

        file = await Files.findByIdAndDelete(req.params.id);
        res.json({ "Success": "File has been successfully deleted" })
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Some internal server error occured")
    }
})

module.exports = router

