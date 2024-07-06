import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import loginImage from '../Images/LoginImage.jpg'
import userIcon from '../Images/userIcon.png'
import passwordIcon from '../Images/padlock.png'
import background from '../Images/bg.jpg'

const BASE_URL = "https://notes-files-kzr6.onrender.com"

const Login = (props) => {

    const [userInfo, setuserInfo] = useState({ id: "", password: "" })

    let navigate = useNavigate()

    const onChange = (e) => {
        setuserInfo({ ...userInfo, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        props.showLoading(true)
        const url = `${BASE_URL}/api/auth/login`
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ loginId: userInfo.id, password: userInfo.password })
        });
        const json = await response.json();
        props.showLoading(false)
        if (!json.success) { props.showAlert("Invalid Id/Password") }
        else {
            localStorage.setItem('token', json.authToken)
            console.log(json.authToken)
            navigate("/")
            props.showAlert("Logged in Successfully")
        }
    }
    return (<>
        <div style={{ margin: '0px', padding: '0px', height: '92vh', background: `url(${background})`, backgroundSize: 'cover' }}>
            <h1 style={{ textAlign: 'center', paddingTop: '4rem', fontSize: '4rem' }}>Welcome To Task Pulse!!</h1>
            <h5 style={{ textAlign: 'center' }}>One stop destination to keep track of all your notes</h5>
            <div className="container" style={{ display: 'flex', justifyContent: 'space-evenly', width: '60%', height: '65vh', alignItems: 'center', paddingTop: '3rem' }}>
                <div className="loginImage" style={{ height: '100%' }}>
                    <img src={loginImage} alt='Welcome to Task Pulse' style={{ height: '20rem', width: '20rem', borderRadius: '5rem' }} />
                </div>
                <div className="loginform" style={{ height: '100%' }}>
                    <h1 style={{ textAlign: 'center', fontFamily: 'fantasy', letterSpacing: '5px', marginBottom: '1rem' }}>LOGIN</h1>
                    <form onSubmit={handleSubmit} style={{ position: 'relative', width: '100%', height: 'auto' }}>
                        <div className="form-group" style={{ marginTop: '1.5rem' }}>
                            <input type="id" className="form-control" id="id" name='id' value={userInfo.id} aria-describedby="emailHelp" placeholder="Username/Email" onChange={onChange} style={{ paddingLeft: '2.5rem' }} />
                            <img src={userIcon} alt='' style={{
                                position: 'absolute',
                                height: '20px',
                                width: '20px',
                                top: '5%',
                                left: '5%'
                            }}></img>
                        </div>
                        <div className="form-group" style={{ marginTop: '1.5rem' }}>
                            <input type="password" className="form-control" id="password" name='password' value={userInfo.password} placeholder="Password" onChange={onChange} style={{ paddingLeft: '2.5rem' }} />
                            <img src={passwordIcon} alt='' style={{
                                position: 'absolute',
                                height: '20px',
                                width: '20px',
                                top: '32%',
                                left: '5%'
                            }} />
                        </div>
                        <div className='LoginButton' style={{ display: 'flex', justifyContent: 'center', paddingTop: '1rem' }}>
                            <button type="submit" className="btn btn-primary my-2" style={{ color: 'white', borderRadius: '2rem', width: '90%', border: 'none', background: 'black' }}>Submit</button>
                        </div>
                        <p style={{ textAlign: 'center', marginTop: '0.5rem' }}>Dont't have an Account?
                            <a href="/signup" style={{ display: 'block', textDecoration: 'none', fontWeight: '500' }}>Signup</a>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    </>
    )
}

export default Login
