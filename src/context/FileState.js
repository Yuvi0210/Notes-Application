import React from "react";
import { useState } from "react";
import FileContext from "./FileContext";

const BASE_URL = "https://notes-files-kzr6.onrender.com"

const FileState = (props) => {
    const filesInitial = [];
    const [files, setFiles] = useState(filesInitial)

    //Add a file
    const addfile = async (title, description, tag, img) => {
        //Api Call
        const url = `${BASE_URL}/api/file/uploadfile`
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({ title, description, tag, img })
        });
        const file = await response.json();
        setFiles(files.concat(file))
    }


    const getallfiles = async () => {
        //Api Call
        const url = `${BASE_URL}/api/file/getallfiles`
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
        });
        const test = await response.json();
        setFiles(test)
    }

    //Delete a file
    const deletefile = async (id) => {
        //Api call to delete the data from the database
        const url = `${BASE_URL}/api/file/deletefile/${id}`
        const response = await fetch(url, {// eslint-disable-line
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
        });
        // console.log(response)
        const newFiles = files.filter((file) => { return file._id !== id })
        setFiles(newFiles)
    }

    return (
        <FileContext.Provider value={{ files, addfile, getallfiles, deletefile }}>
            {props.children}
        </FileContext.Provider>
    )
}
// console.log(FileState)
export default FileState


