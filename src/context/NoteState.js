import React from "react";
import { useState } from "react";
import NoteContext from "./NoteContext";

const BASE_URL = "https://notes-files-kzr6.onrender.com"


const NoteState = (props) => {
    const notesInitial = [];
    const [notes, setNotes] = useState(notesInitial)


    //Get All Notes
    const getnotes = async () => {
        //Api Call
        const url = `${BASE_URL}/api/notes/fetchallnotes`
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
        });
        const test = await response.json();
        setNotes(test)
    }


    //Edit a note
    const editNote = async (id, title, description, tag, color) => {
        //Api call to edit a note
        //here id is the note id and not the auth token
        const url = `${BASE_URL}/api/notes/updatenote/${id}`
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({ title, description, tag, color })
        });
        const test = await response.json();
        console.log(test)

        //Logic to edit a note on the client side is below
        let newNotes = JSON.parse(JSON.stringify(notes))
        //Searching the note in the database
        for (let index = 0; index < newNotes.length; index++) {
            const element = newNotes[index];
            if (element._id === id) {
                newNotes[index].title = title
                newNotes[index].description = description
                newNotes[index].tag = tag
                newNotes[index].color = color
                break
            }
        }
        setNotes(newNotes)
    }


    //Add a note
    const addNote = async (title, description, tag, color) => {
        //Api Call
        const url = `${BASE_URL}/api/notes/addnote`
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({ title, description, tag, color })
        });
        const note = await response.json();
        // Logic to add the note on the client side

        setNotes(notes.concat(note))
    }

    //Delete a note
    const deleteNote = async (id) => {
        //Api call to delete the data from the database
        const url = `${BASE_URL}/api/notes/deletenote/${id}`
        const response = await fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
        });
        console.log(response)
        //Client Side deltion code
        const newNotes = notes.filter((note) => { return note._id !== id })
        setNotes(newNotes)
    }

    return (
        <NoteContext.Provider value={{ notes, deleteNote, editNote, addNote, getnotes }}>
            {props.children}
        </NoteContext.Provider>
    )
}
export default NoteState


