import React, { useRef } from 'react'
import { useContext, useState, useEffect } from 'react'
import FileContext from '../context/FileContext'
import { useNavigate } from 'react-router-dom'
import FileItem from './FileItem'


const FileUpload = (props) => {

  const BASE_URL = "https://notes-files-kzr6.onrender.com"
  const closeAddFile = useRef(null)
  const fileInputRef = useRef(null)


  const context = useContext(FileContext)
  const { files, addfile, getallfiles } = context
  //Local temporary file variable
  const [file, setFile] = useState({ title: "", description: "", tag: "" })
  const [user, setUser] = useState({ name: "", username: "", email: "", })
  const [addfileLoading, setAddFileLoading] = useState(false)
  //Image Variable
  const [img, setImg] = useState({
    imageUrl: '',
    file: null
  })
  let navigate = useNavigate()


  useEffect(() => {
    if (localStorage.getItem('token')) {
      getallfiles()
      getUser()
    }
    else {
      navigate('/login')
    }
  }, [])// eslint-disable-line

  const getUser = async () => {
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
  }

  //To handle the submit button click
  const handleClick = async (e) => {
    e.preventDefault()
    try {
      setAddFileLoading(true)
      if (img.file.type === 'image/jpeg') {
        await addfile(file.title, file.description, file.tag, img.imageUrl)
        props.showAlert("File Uploaded Successfully")
        setFile({ title: "", description: "", tag: "" })
        setImg({ imageUrl: '', file: null })
        fileInputRef.current.value = ""
        closeAddFile.current.click()
      }
      else {
        console.log("Invalid Format")
        props.showAlert("Please provide image in jpeg/jpg formats only")
        return
      }
      setAddFileLoading(false)

    } catch (error) {
      console.log(error)
    }
  }
  //To handle the onChange for form field except the file
  const onChange = (e) => {
    setFile({ ...file, [e.target.name]: e.target.value })
  }
  //To handle the onChange for the file input
  const PreviewImageChangeHandler = (e) => {
    const reader = new FileReader()

    reader.onload = (r) => {
      setImg({
        imageUrl: r.target.result,
        file: e.target.files[0]
      })
    }

    reader.readAsDataURL(e.target.files[0])
  }

  return (
    <>
      <div style={{ position: 'absolute', left: '0', width: '100%', padding: '1rem', background: '#b5b5b5', minHeight: '92vh' }}>
        <div className="container my-3" style={{ width: '85%', margin: 'auto' }}>
          {files.length === 0 ? <>
            <div className="container" style={{ textAlign: 'center', marginTop: '3rem', fontFamily: 'cursive' }}>
              <h1 style={{
                color: '#f2e6d3',
                boxShadow: '5px 0 10px #ffe6be',
                background: '#515151',
                borderRadius: '2rem'
              }}>Hello {user.name}!! Welcome to Task Pulse</h1>
              <h4>Click on the Add File button in the corner to get started</h4>
            </div>

          </> :
            <>
              <div className="row my-3">
                <h1 style={{ textAlign: 'center', fontFamily: 'cursive', fontWeight: 'bold' }}>Files</h1>
                {files.map((file) => {
                  return <FileItem file={file} key={file._id} showAlert={props.showAlert}></FileItem>
                })}
              </div>
            </>
          }
          <p data-toggle="tooltip">
            <button
              style={{
                position: 'fixed', right: '4%', height: '3rem', width: '3rem', borderRadius: '100%', bottom: '1em', fontSize: 'x-large', display: 'flex', alignItems: 'center', textAlign: 'center', justifyContent: 'center', border: '2px solid blue', color: 'white', background: 'blue'
              }}
              data-toggle="modal" data-target="#AddNoteModal" data-placement="top" title='Add File'>
              +
            </button>
          </p>

          <div className="modal fade" id="AddNoteModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered" role="document">
              <div className="modal-content" style={{
                border: '2px solid black',
                boxShadow: '0 0 10px rgba(255,255,255,0.8)'
              }}>
                <div className="modal-header">
                  <h2 className="modal-title" id="exampleModalLongTitle">Add File</h2>
                  <button ref={closeAddFile} type="button" className="close" data-dismiss="modal" aria-label="Close" style={{ border: '2px solid red', borderRadius: '100%', color: 'white', background: 'red' }}>
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  <form>
                    <div className="mb-3">
                      <label htmlFor="title" className="form-label">Title</label>
                      <input type="text" className="form-control" id="title" name='title' value={file.title} onChange={onChange} />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="description" className="form-label">Description</label>
                      <input type="text" className="form-control" id="description" name='description' value={file.description} onChange={onChange} />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="tag" className="form-label">Color</label>
                      <input type="color" className="form-control" id="tag" name='tag' value={file.tag} onChange={onChange} />
                    </div>
                    <div className="mb-3">
                      {/* //Preview Image would Load Here */}
                      <div className="container my-3" style={{ display: !img.imageUrl ? 'none' : 'flex', alignItems: 'center', justifyContent: 'center' }} >
                        <img style={{ objectFit: 'cover', height: 200, width: 250, textAlign: 'center', margin: 'auto' }} src={img.imageUrl} alt="" />
                      </div>
                      <input type="file" className="form-control" onChange={PreviewImageChangeHandler} ref={fileInputRef} />
                    </div>
                  </form>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-primary" onClick={handleClick} disabled={addfileLoading ? true : false}>
                    {addfileLoading ? <>
                      <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                      <span className="sr-only">Loading...</span>
                    </> : <>
                      Add File
                    </>}
                  </button>
                  <button type="button" className="btn btn-danger" data-dismiss="modal" disabled={addfileLoading ? true : false}>Close</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default FileUpload
