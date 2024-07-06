import React, { useEffect, useContext, useRef, useState, useCallback } from 'react'
import NoteContext from '../context/NoteContext'
import AddNote from './AddNote'
import NoteItem from './NoteItem'
import { useNavigate } from 'react-router-dom'

const BASE_URL = "https://notes-files-kzr6.onrender.com"

const Notes = (props) => {

    const { showAlert } = props


    //using the global note context
    const context = useContext(NoteContext)
    const [newNote, setnewNote] = useState({ title: "", description: "", tag: "", color: "#000000" })
    const { notes, getnotes, editNote, addNote } = context
    const [user, setUser] = useState({ name: "", username: "", email: "", })

    let navigate = useNavigate();

    //Fetching the user details using the getuser route
    const getUser = useCallback(async () => {
        const url = `${BASE_URL}/api/auth/getuser`
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'auth-token': localStorage.getItem('token')
            },
        })
        const res = await response.json();
        setUser({
            name: res.name,
            username: res.username,
            email: res.email
        })
    }, []);


    /* eslint-disable */

    //The below use effect would render the notes only on the first render due to empty [] at last
    useEffect(() => {
        if (localStorage.getItem('token')) {
            navigate('/')
            getnotes()
            getUser()
        }
        else {
            navigate('/signup')
        }
    }, [])

    /* eslint-enable */

    //ref is used to keep values between render as after render all values are reset except the ref
    //useRef is a hook

    const ref = useRef(null)
    const refClose = useRef(null)

    const closeAddNote = useRef(null)

    const [note, setNote] = useState({ id: "", etitle: "", edescription: "", etag: "", ecolor: "" })
    const [isOpen, setIsOpen] = useState(false);

    const updateNotes = (currentNote) => {
        ref.current.click();
        setNote({ id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag, ecolor: currentNote.color })
    }



    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }

    const handleUpdateNoteClick = (e) => {
        if (note.etitle.length < 5) { props.showAlert("Title should be min 5 characters in length") }
        else if (note.edescription.length < 5) { props.showAlert("Description should be min 5 characters in length") }
        else if (note.etag.length > 10) { props.showAlert("Tag should be less than 10 characters in length") }
        else {
            props.showAlert("Note Updated Successfully")
            editNote(note.id, note.etitle, note.edescription, note.etag, note.ecolor)
            refClose.current.click()
        }
    }

    const handleAddNoteClick = async (e) => {
        if (newNote.title.length < 5) { props.showAlert("Title should be min 5 characters in length") }
        else if (newNote.description.length < 5) { props.showAlert("Description should be min 5 characters in length") }
        else if (newNote.tag.length > 10) { props.showAlert("Tag should be less than 10 characters in length") }
        else {
            props.showLoading(true)
            addNote(newNote.title, newNote.description, newNote.tag, newNote.color)
            setnewNote({ title: "", description: "", tag: "", color: "#000000" })
            //Now we will close this note using ref
            props.showLoading(false)
            closeAddNote.current.click()
            //Showing Alert that the new note has been added
            props.showAlert("New Note Added Successfully")
        }
    }
    return (
        <>
            <div style={{ position: 'absolute', left: '0', width: '100%', padding: '1rem', background: '#b5b5b5', minHeight: '92vh' }}>
                <button ref={ref} type="button" className="btn btn-primary" data-bs-toggle="modal" data-target="#test" onClick={() => {
                    setIsOpen(true)
                }} style={{ display: 'none' }} ></button>

                <div className="row my-3" style={{ width: '85%', margin: 'auto' }}>
                    {notes.length === 0
                        ? <>
                            <div className="container" style={{ textAlign: 'center', marginTop: '2rem', fontFamily: 'cursive' }}>
                                <h1 style={{
                                    color: '#f2e6d3',
                                    boxShadow: '5px 0 10px #ffe6be',
                                    background: '#515151',
                                    borderRadius: '2rem'
                                }}>Hello {user.name}!! Welcome to Task Pulse</h1>
                                <h4>Click on the Add Note button in the corner to get started</h4>
                            </div>
                        </>
                        :
                        <>
                            <h1 style={{ textAlign: 'center', fontFamily: 'cursive', fontWeight: 'bold' }}>Notes</h1>
                            {notes.map((note) => {
                                return <NoteItem note={note} key={note._id} updateNotes={updateNotes} showAlert={showAlert} showLoading={props.showLoading}></NoteItem>
                            })}
                        </>
                    }
                </div>
                <p data-toggle="tooltip">
                    <button
                        style={{
                            position: 'fixed', right: '4%', height: '3rem', width: '3rem', borderRadius: '100%', bottom: '1em', fontSize: 'x-large', display: 'flex', alignItems: 'center', textAlign: 'center', justifyContent: 'center', border: '2px solid blue', color: 'white', background: 'blue'
                        }}
                        data-toggle="modal" data-target="#AddNoteModal" data-placement="top" title='Add Note'>
                        +
                    </button>
                </p>

                <div className="modal fade" id="AddNoteModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h2 className="modal-title" id="exampleModalLongTitle">Add Note</h2>
                                <button ref={closeAddNote} type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <AddNote showAlert={showAlert} newNote={newNote} setnewNote={setnewNote} />
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-primary" onClick={handleAddNoteClick}>Add Note</button>
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            {/* below is demo modal overlay */}
            {isOpen &&
                (
                    <div className="outer" style={{ position: 'fixed', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: 'black', marginLeft: '-3vw', marginTop: '5vh', height: '85vh', width: '90vw', opacity: '0.9' }}>
                        <div className="c" style={{ opacity: '1', color: 'white', border: '2px solid white', padding: '1rem', width: '25rem' }}>
                            <h1 style={{ textAlign: 'center' }}>Edit Text</h1>
                            <form id='EditNoteForm' className='my-3'>
                                <div className="mb-3">
                                    <label htmlFor="Title" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="etitle" name='etitle' value={note.etitle} onChange={onChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="Description" className="form-label">Description</label>
                                    <input type="text" className="form-control" id="edescription" name='edescription' value={note.edescription} onChange={onChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="Tag" className="form-label">Tag</label>
                                    <input type="text" className="form-control" id="etag" name='etag' value={note.etag} onChange={onChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="Color" className="form-label">Color</label>
                                    <input type="color" className="form-control" id="ecolor" name='ecolor' value={note.ecolor} onChange={onChange} />
                                </div>
                            </form>
                            <button ref={refClose} style={{ borderRadius: '10px', width: '10rem', margin: '0.5rem', opacity: '1', backgroundColor: 'blue', color: 'white', marginTop: '1rem' }} onClick={() => { setIsOpen(false) }}>Close</button>
                            <button style={{ borderRadius: '10px', width: '10rem', margin: '0.5rem', opacity: '1', backgroundColor: 'blue', color: 'white', marginTop: '1rem' }} onClick={handleUpdateNoteClick}>UpdateNote</button>
                        </div>
                    </div>
                )}
        </>
    )
}

export default Notes
