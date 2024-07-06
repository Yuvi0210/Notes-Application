import React, { useEffect, useState, useContext } from 'react'
import { Buffer } from 'buffer'
import FileContext from '../context/FileContext'

const FileItem = (props) => {
    const { file } = props
    const [imgUrl, setImgUrl] = useState('')
    const [file_deleted, setFileDeleted] = useState(false)

    const context = useContext(FileContext)
    const { deletefile } = context


    const handleClick = () => {
        setFileDeleted(true)
        deletefile(file._id)
        props.showAlert("File Deleted Successfully")
    }

    const handleDownload = () => {
        try {
            const imageUrl = `data:image/jpeg;base64,/${imgUrl}`;
            const fileName = 'image.jpg';

            console.log(imageUrl)

            const link = document.createElement('a');
            link.href = imageUrl;
            link.download = fileName;

            document.body.appendChild(link);
            link.click();

            document.body.removeChild(link);

        } catch (error) {
            console.log(error)
        }


    }

    useEffect(() => {
        const ImageUrl = Buffer.from(file.img.data.data).toString('base64')
        const test = ImageUrl.slice(21)
        setImgUrl(test)
    }, [])// eslint-disable-line



    return (
        <>
            {!file_deleted && <>
                <div className='col-md-3'>
                    <div className="card my-3" style={{ padding: '0px', height: '15rem' }}>
                        <div className="UploadedImage" style={{ display: 'flex', justifyContent: 'center' }}>
                            <img className="card-img-top" src={`data:image/jpeg;base64,/${imgUrl}`} alt="" style={{ borderRadius: '5px', height: '11.5rem', width: 'auto', maxWidth: '100%' }} onClick={handleDownload} />
                        </div>
                        <div className="card-body" style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <h5 className="card-title">{file.title}</h5>
                            <div className="utilityButtons">
                                <i className="fa-sharp fa-solid fa-trash mx-3" id='delete' name='delete' data-toggle="tooltip" title='Delete File' onClick={handleClick}></i>
                                <i class="fa fa-download" aria-hidden="true" data-toggle="tooltip" title='Download File' onClick={handleDownload}></i>
                            </div>
                        </div>
                    </div>
                </div>
            </>}
        </>
    )
}

export default FileItem
