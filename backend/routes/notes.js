const express = require('express')
const router = express.Router()
const Notes = require("../models/Notes")
const fetchuser = require('../middleware/userinfo')
const { validationResult, body } = require('express-validator');

//Route 1 api/notes/addnote
router.post('/addnote', fetchuser, [
    body('title', 'Title must be atleast 3 characters in length').isLength({ min: 3 }),
    body('description', 'Description must be atleast 5 characters').isLength({ min: 5 })
], async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    try {
        //if there are no errors then the following code will be executed
        const { title, description, tag, color } = req.body
        const note = new Notes({
            title, description, tag, color, user: req.user
        })
        const savedNote = await note.save()
        res.json(savedNote)
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Some internal server error occured")
    }
})



//Route 2 api/notes/fetchallnotes to get all the notes corresponding to a particular user Login required
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Notes.find({ user: req.user })
        res.json(notes)
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Some internal server error occured")
    }
})

//Route 3 api/notes/updatenote  Update a note of a user Login required

router.put('/updatenote/:id', fetchuser, async (req, res) => {
    const { title, description, tag, color } = req.body
    try {
        //Creating a new note object 
        const newNote = {};
        if (title) newNote.title = title;
        if (description) newNote.description = description;
        if (tag) newNote.tag = tag;
        if (color) newNote.color = color

        //Find the note to be updated and update it
        let note = await Notes.findById(req.params.id)
        if (!note) { return res.status(404).send("Requested Note not Found") }
        if (note.user.toString() !== req.user) { return res.status(401).send("Not Allowed") }

        note = await Notes.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
        res.json({ note })
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Some internal server error occured")
    }
})

//Route 4 api/notes/deletenote to delete a note corresponding to a particular user. Login required
router.delete('/deletenote/:id', fetchuser, async (req, res) => {
    try {
        //Find the note to be deleted and delete it
        let note = await Notes.findById(req.params.id)
        if (!note) { return res.status(404).send("Requested Note not Found") }
        if (note.user.toString() !== req.user) { return res.status(401).send("Not Allowed") }

        note = await Notes.findByIdAndDelete(req.params.id);
        res.json({ "Success": "Note has been successfully deleted" })
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Some internal server error occured")
    }
})

module.exports = router