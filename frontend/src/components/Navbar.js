import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { store } from '../App';

const Navbar = () => {
    const navigate = useNavigate();
    const [token, setToken] = useContext(store);
    const LogOut = () => {
        // alert("Log Out Clicked");
        setToken(null);
        navigate('/');
    }
    return (
        <>

            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">

                    <Link to="/home" className="navbar-brand" aria-current="page">Logo</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon" />
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">

                            {
                                token
                                    ? <>
                                        {/* <li className="nav-item">
                                            <Link to="/" className="nav-link active" aria-current="page">Home</Link>
                                        </li> */}
                                        <li className="nav-item">
                                            <button className='logout_btn' onClick={LogOut}>Log Out</button>
                                        </li>
                                    </>

                                    : <>
                                        <li className="nav-item">
                                            <Link to="/register" className="nav-link active" aria-current="page">Register</Link>
                                        </li>

                                        <li className="nav-item">
                                            <Link to="/login" className="nav-link active" aria-current="page">Login</Link>
                                        </li>
                                    </>
                            }

                        </ul>

                    </div>
                </div>
            </nav>


        </>
    )
}

export default Navbar
