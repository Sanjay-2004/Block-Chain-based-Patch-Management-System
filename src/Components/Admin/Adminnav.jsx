import React, { useEffect, useState } from 'react';
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom';
import axios from 'axios';


export default function Adminnav() {
    const [showAlert, setShowAlert] = useState(false);
    const location = useLocation();

    const checkVerification = async () => {
        try {
            const token = localStorage.getItem('token');
            console.log(token);
            const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/verification`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response.status === 200) {
                setShowAlert(true);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    useEffect(() => {
        checkVerification();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        window.location.href = '/login/';
    };

    // Check if the current location is /profile
    const isProfilePage = location.pathname === '/profile';

    return (
        <>
            <nav className="navbar bg-dark navbar-expand-lg bg-body-tertiary py-2" data-bs-theme="dark">
                <div className="container-fluid ">
                    <NavLink className="navbar-brand text-white " to="/">
                        BPMS
                    </NavLink>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="/navbarSupportedContent"
                        aria-controls="navbarSupportedContent"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
                        <ul className="navbar-nav align-items-center">
                            <li className="nav-item ms-5">
                                <NavLink className="nav-link text-white" aria-current="page" to="deployment">
                                    DEPLOYMENT
                                </NavLink>
                            </li>
                            <li className="nav-item ms-5">
                                <NavLink className="nav-link text-white" to="current-request">
                                    CURRENT REQUEST
                                </NavLink>
                            </li>
                            <li className="nav-item ms-5">
                                <NavLink className="nav-link text-white" to="register-new">
                                    NEW REGISTRATION
                                </NavLink>
                            </li>
                            <li className="nav-item ms-5">
                                <div className="btn-group dropstart">
                                    <button
                                        type="button"
                                        className="btn btn-light btn-lg dropdown-toggle"
                                        data-bs-toggle="dropdown"
                                        aria-expanded="false"
                                    >
                                        <i className="fa-regular fa-user"></i>
                                    </button>
                                    <ul className="dropdown-menu bg-light">
                                        <li>
                                            <NavLink className="dropdown-item" to="/profile">
                                                Profile
                                            </NavLink>
                                        </li>
                                        <li>
                                            <NavLink className="dropdown-item " to="/transactions">
                                                Transactions
                                            </NavLink>
                                        </li>
                                        <li>
                                            <hr className="dropdown-divider" />
                                        </li>
                                        <li>
                                            <NavLink className="dropdown-item bg-light text-dark" onClick={handleLogout}>
                                                Log Out
                                            </NavLink>
                                        </li>
                                    </ul>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            {!isProfilePage && showAlert && (
                <div className="alert alert-danger alert-dismissible fade show" role="alert">
                    Please go to your profile section and change your password.
                    <Link to="/profile" className="ms-2 btn btn-sm btn-warning">
                        Go to Profile
                    </Link>
                    <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>
            )}
            <Outlet />
        </>
    );
}
