import { React } from 'react'
import { Link, useLocation, useNavigate } from "react-router-dom"

import '../componentsCss/Navbar.css'

import logo from '../Images/logo.png'
import { FaUser } from "react-icons/fa";



const Navbar = () => {
    let location = useLocation();
    let navigate = useNavigate();

    const userSessionToken = localStorage.getItem('token')

    const handleLogout = (e) => {
        localStorage.removeItem('token')
        navigate("/login")
    }

    // const gotouserdetails = (e) => {
    //     navigate("/userDetails")
    // }

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark" style={{ padding: '0px', height: '8vh', width: '100vw' }}>
                <div className="container-fluid" style={{ justifyContent: localStorage.getItem('token') ? 'space-between' : 'center' }}>
                    <Link className="navbar-brand" to="/" style={{ margin: '0px', padding: '0px' }}>
                        <img src={logo} alt='Task Pulse' style={{ maxHeight: '7.8vh', borderRadius: '1rem' }} />
                    </Link>
                    {!localStorage.getItem('token') ? <></> :
                        <>
                            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"></span>
                            </button>
                            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                                <ul className="navbar-nav mr-auto mb-2 mb-lg-0">
                                    {userSessionToken && (
                                        <>
                                            <div className="Pages" style={{ display: 'flex' }}>
                                                <li className="nav-item">
                                                    <Link className={`nav-link ${location.pathname === "/" ? "active" : ""}`} aria-current="page" to="/" style={{ fontFamily: 'monospace', fontSize: '1.5rem', marginLeft: '1rem' }}>MyNotes</Link>
                                                </li>
                                                <li className="nav-item">
                                                    <Link className={`nav-link ${location.pathname === "/about" ? "active" : ""}`} aria-current="page" to="/about" style={{ fontFamily: 'monospace', fontSize: '1.5rem', marginLeft: '1rem' }}>MyFiles</Link>
                                                </li>
                                            </div>
                                            <div className="userIcons" style={{ display: 'flex', position: 'absolute', left: '96vw', top: '3.25vh' }}>
                                                <li className="nav-item" style={{ display: 'flex', alignItems: 'center' }}>
                                                    <div className="btn-group dropleft">
                                                        <FaUser style={{ color: 'white', marginRight: '1rem', maxHeight: '7.5vh' }} className="dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" />

                                                        {/* <img src={userLogo}  alt='' style={{ maxHeight: '7.5vh', backgroundColor: '#212529', color: 'white' }} /> */}
                                                        <div className="dropdown-menu" style={{ position: 'absolute', right: '0.1rem', top: '1.5rem' }}>
                                                            <button className="dropdown-item" onClick={handleLogout}>Logout</button>
                                                            {/* <button className="dropdown-item" onClick={gotouserdetails}>UserDetails</button> */}
                                                        </div>
                                                    </div>
                                                </li>
                                            </div>

                                        </>
                                    )}
                                </ul>
                            </div>
                        </>
                    }
                </div>
            </nav>
        </div>
    )
}

export default Navbar
