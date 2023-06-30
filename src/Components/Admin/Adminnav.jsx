import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'

export default function Adminnav() {

    const handleLogout = () => {

    };
    // Need to do
    return (

        <>
            <nav className="navbar bg-dark navbar-expand-lg  bg-body-tertiary py-2" data-bs-theme="dark">
                <div className="container-fluid ">

                    <NavLink className="navbar-brand text-white " to="/">BPMS</NavLink>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                        data-bs-target="/navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                        aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
                        <ul className="navbar-nav align-items-center">
                            <li className="nav-item ms-5">
                                <NavLink className="nav-link text-white" aria-current="page" to="deployment">DEPLOYMENT</NavLink>
                            </li>
                            <li className="nav-item ms-5">
                                <NavLink className="nav-link text-white" to="current-request">CURRENT REQUEST</NavLink>
                            </li>
                            <li className="nav-item ms-5">
                                <NavLink className="nav-link text-white" to="register-new">NEW REGISTRATION</NavLink>
                            </li>
                            <li className="nav-item ms-5">
                                <div className="btn-group dropstart">
                                    <button type="button" className="btn btn-light btn-lg dropdown-toggle" data-bs-toggle="dropdown"
                                        aria-expanded="false">
                                        <i className="fa-regular fa-user"></i>
                                    </button>
                                    <ul className="dropdown-menu">
                                        <li><NavLink className="dropdown-item" to="/">Profile</NavLink></li>
                                        <li><NavLink className="dropdown-item" to="/transactions">Transactions</NavLink></li>
                                        <li><NavLink className="dropdown-item" to="/">Settings</NavLink></li>
                                        <li>
                                            <hr className="dropdown-divider" />
                                        </li>
                                        <li>
                                            <button className="btn btn-link" onClick={handleLogout}>
                                                <NavLink className="dropdown-item" to="/">Log Out</NavLink>
                                            </button>
                                        </li>
                                    </ul>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav><Outlet />
        </>

    )
}
