import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import bgImg from '../Images/bg.jpg'

const BASE_URL = "https://notes-files-kzr6.onrender.com"

const Signup = (props) => {

    const [userInfo, setUserInfo] = useState({ name: "", username: "", email: "", password: "" })
    const navigate = useNavigate();


    const onChange = (e) => {
        setUserInfo({ ...userInfo, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (userInfo.name.length < 3) { props.showAlert("Name should have atleast 3 characters") }
        else if (userInfo.username.length < 5) { props.showAlert("Username should have atleast 5 characters") }
        else if (userInfo.password.length < 8) { props.showAlert("Password should have atleast 8 characters") }
        else {
            const url = `${BASE_URL}/api/auth/createuser`
            props.showLoading(true)
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name: userInfo.name, username: userInfo.username, email: userInfo.email, password: userInfo.password })
            });
            const json = await response.json();
            props.showLoading(false)
            if (!json.success) { props.showAlert(json.errors) }
            else {
                localStorage.setItem('token', json.authToken)
                props.showAlert("Logged in Successfully")
                navigate("/")
                console.log(json)
            }
        }
    }

    return (
        <>
            <div className="SignUpPage" style={{ margin: '0px', background: `url(${bgImg})`, height: '92vh', width: '100vw', backgroundSize: 'cover', justifyContent: 'center' }}>
                <h1 style={{ textAlign: 'center', paddingTop: '4rem', fontSize: '4rem' }}>Welcome To Task Pulse!!</h1>
                <h5 style={{ textAlign: 'center' }}>One stop destination to keep track of all your notes</h5>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <div className="SignUpBox" style={{ display: 'flex', width: '60%', justifyContent: 'space-evenly' }}>
                        <div className="ImageBox" style={{ width: '50%', display: "flex", alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
                            <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                                className="img-fluid" alt="Sample" style={{ borderRadius: '4.5rem' }} />
                        </div>
                        <div className="SignUpForm" style={{
                            width: '50%',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            paddingTop: '3rem'
                        }}>

                            <h1 style={{ textAlign: 'center', fontFamily: 'fantasy', letterSpacing: '5px', marginBottom: '1rem' }}>SIGNUP</h1>

                            <form className="mx-1 mx-md-4" onSubmit={handleSubmit} style={{ width: '60%' }}>

                                <div className="d-flex flex-row align-items-center mb-3">
                                    <i className="fas fa-user fa-lg me-3 fa-fw" style={{ position: 'absolute', paddingLeft: '0.8rem' }}></i>
                                    <div className="form-outline flex-fill mb-1">
                                        <input type="text" id="name" className="form-control" name='name' value={userInfo.name} onChange={onChange} placeholder='Your Name' style={{ paddingLeft: '2.5rem' }} />
                                    </div>
                                </div>

                                <div className="d-flex flex-row align-items-center mb-3">
                                    <i className="fas fa-envelope fa-lg me-3 fa-fw" style={{ position: 'absolute', paddingLeft: '0.8rem' }}></i>
                                    <div className="form-outline flex-fill mb-0">
                                        <input type="email" id="email" className="form-control" name='email' value={userInfo.email} onChange={onChange} placeholder='Your Email' style={{ paddingLeft: '2.5rem' }} />
                                    </div>
                                </div>

                                <div className="d-flex flex-row align-items-center mb-3">
                                    <i className="fas fa-user fa-lg me-3 fa-fw" style={{ position: 'absolute', paddingLeft: '0.8rem' }}></i>
                                    <div className="form-outline flex-fill mb-0">
                                        <input type="text" id="username" className="form-control" name='username' value={userInfo.username} onChange={onChange} placeholder='Select username' style={{ paddingLeft: '2.5rem' }} />
                                    </div>
                                </div>

                                <div className="d-flex flex-row align-items-center mb-3">
                                    <i className="fas fa-lock fa-lg me-3 fa-fw" style={{ position: 'absolute', paddingLeft: '0.8rem' }}></i>
                                    <div className="form-outline flex-fill mb-0">
                                        <input type="password" id="password" className="form-control" name='password' value={userInfo.password} onChange={onChange} placeholder='Set Password' style={{ paddingLeft: '2.5rem' }} />
                                    </div>
                                </div>

                                <div className="d-flex justify-content-center">
                                    <button type="submit" className="btn" style={{ color: 'white', borderRadius: '2rem', background: 'black', width: '80%' }} >Register</button>
                                </div>
                                <p style={{ textAlign: 'center', marginTop: '0.8rem' }}>Already have an Account?
                                    <a href="/login" style={{ display: 'block', textDecoration: 'none', fontWeight: '500' }}>Login</a>
                                </p>
                            </form>

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Signup
