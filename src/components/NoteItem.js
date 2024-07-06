import React, { useState } from 'react'
import { useContext } from 'react'
import NoteContext from '../context/NoteContext'

import styled from 'styled-components'

const Card = styled.div`
    min-height: 15rem;
    max-height: 15rem;
    border: 4px solid ${props => props.tagbordercolor};
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    transition: box-shadow 0.3s;

    &:hover {
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.9);
    }
`


const NoteItem = (props) => {

    const context = useContext(NoteContext)
    const { deleteNote } = context
    const { note, updateNotes } = props

    const [noteDisplay, setnoteDisplay] = useState(true)


    //Function to delete a note 
    const handleClick = () => {
        setnoteDisplay(false)
        deleteNote(note._id)
        props.showAlert("Note Successfully Deleted")
    }
    return (
        <>{
            noteDisplay ? <>
                <div className='col-md-3'>
                    <div className='card my-3' style={{ borderRadius: '10px', padding: '0px', maxHeight: '15rem' }}>
                        <Card tagbordercolor={note.color}>
                            <div className="card-body" style={{ padding: '0.8rem' }}>
                                <h5 className="card-title" style={{ textAlign: 'center', fontWeight: 'bold', borderBottom: '1px dashed black', fontFamily: 'cursive', borderColor: 'gray' }}>{note.title}</h5>
                                <p className="card-text" style={{ minHeight: '8em', maxHeight: '8em', overflow: 'scroll' }}>{note.description}</p>
                                <div className="card-footer" style={{ display: 'flex', justifyContent: 'space-between', padding: '0px' }}>
                                    <div className="cardTag" style={{ maxHeight: '2rem', overflow: 'scroll' }}>
                                        <p>Tag: {note.tag}</p>
                                    </div>
                                    <div className="controlButtons" style={{ display: 'flex', alignItems: 'center' }}>
                                        <i className="fa-sharp fa-solid fa-trash mx-3" id='delete' name='delete' onClick={handleClick} data-toggle="tooltip" title='Delete Note'></i>
                                        <i className="fa-sharp fa-solid fa-pen-to-square" id='edit' name='edit' onClick={() => { updateNotes(note) }} data-toggle="tooltip" title='Update Note' style={{ marginRight: '1em' }}></i>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>
            </> : <></>
        }
        </>
    )
}

export default NoteItem
