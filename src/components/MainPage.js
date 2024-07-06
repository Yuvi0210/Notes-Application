import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const MainPage = () => {
    let navigate = useNavigate()
    useEffect(() => {
        if (localStorage.getItem('token')) {
            navigate('/home')
        }
        else {
            navigate('/login')
        }

    }, [navigate])
    return (
        <div>
            <h1>Main Layout Page</h1>
        </div>
    )
}

export default MainPage