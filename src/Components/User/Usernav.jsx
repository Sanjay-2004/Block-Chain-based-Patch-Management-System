import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'

export default function Usernav() {

    const handleLogout = () => {
        localStorage.removeItem("token");
        window.location.href = "/login/";
    };
    return (
        <>
            <nav className="navbar bg-dark navbar-expand-lg  bg-body-tertiary py-2" data-bs-theme="dark">
                <div className="container-fluid ">
                    <NavLink className="navbar-brand text-light " to="/">BPMS</NavLink>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                        aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
                        <ul className="navbar-nav align-items-center">
                            <li className="nav-item ms-5">
                                <NavLink className="nav-link text-light" aria-current="page" to="report">REPORT BUG</NavLink>
                            </li>
                            <li className="nav-item ms-5">
                                <NavLink className="nav-link text-light" to="updates">CHECK FOR UPDATES</NavLink>
                            </li>
                            <li className="nav-item ms-5">
                                <NavLink className="btn btn-light" onClick={handleLogout}>
                                    <i className="fa-regular fa-user"></i>
                                    Logout
                                </NavLink>
                            </li>

                        </ul>
                    </div>
                </div>
            </nav><Outlet />
        </>

    )
}
