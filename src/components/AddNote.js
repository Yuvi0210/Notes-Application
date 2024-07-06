import React from 'react'

const AddNote = (props) => {
    const onChange = (e) => {
        props.setnewNote({ ...props.newNote, [e.target.name]: e.target.value })
    }

    return (
        <>

            <div className="container my-3">
                <form>
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">Title</label>
                        <input type="text" className="form-control" id="title" name='title' value={props.newNote.title} onChange={onChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Description</label>
                        <input type="text" className="form-control" id="description" name='description' value={props.newNote.description} onChange={onChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="tag" className="form-label">Tag</label>
                        <input type="text" className="form-control" id="tag" name='tag' value={props.newNote.tag} onChange={onChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="color" className="form-label">Color</label>
                        <input type="color" className="form-control" id="color" name='color' value={props.newNote.color} onChange={onChange} />
                    </div>
                </form>
            </div>
        </>
    )
}

export default AddNote
