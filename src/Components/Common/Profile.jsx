import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import "bootstrap/dist/css/bootstrap.min.css";
import "../Styles.css"; // Custom CSS file for styling

export default function Profile() {
    const [profile, setProfile] = useState({});
    const [password, setPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);

    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        try {
            const token = localStorage.getItem("token");
            const response = await axios.get("http://localhost:8080/employees", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setProfile(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    const handleChangePassword = async () => {
        try {
            const token = localStorage.getItem("token");

            if (password === newPassword) {
                setPasswordError("Current password and new password must be different");
                return;
            }

            const response = await axios.put(
                "http://localhost:8080/employees",
                {
                    password,
                    newPassword,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (response.status === 200) {
                console.log("Edited");
                setProfile((prevProfile) => ({
                    ...prevProfile,
                    verified: true,
                }));
                setPassword("");
                setNewPassword("");
                setPasswordError("");
            }
        } catch (error) {
            console.log(error);
        }
    };


    const togglePasswordVisibility = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword);
    };

    const toggleNewPasswordVisibility = () => {
        setShowNewPassword((prevShowNewPassword) => !prevShowNewPassword);
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6">
                    <h1>Profile Details</h1>
                    <div className="profile-details">
                        <div className="profile-detail">
                            <span className="profile-key">First Name:</span>
                            <span className="profile-value">{profile.firstName}</span>
                        </div>
                        <div className="profile-detail">
                            <span className="profile-key">Last Name:</span>
                            <span className="profile-value">{profile.lastName}</span>
                        </div>
                        <div className="profile-detail">
                            <span className="profile-key">Email:</span>
                            <span className="profile-value">{profile.email}</span>
                        </div>
                        <div className="profile-detail">
                            <span className="profile-key">Role:</span>
                            <span className="profile-value">{profile.role}</span>
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-body">
                            <h2>Change Password</h2>
                            <div className="form-group">
                                <label>Current Password:</label>
                                <div className="input-group">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        className="form-control"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                    <div className="input-group-append">
                                        <span
                                            className="input-group-text"
                                            onClick={togglePasswordVisibility}
                                            style={{ cursor: "pointer" }}
                                        >
                                            <FontAwesomeIcon
                                                icon={showPassword ? faEyeSlash : faEye}
                                            />
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group">
                                <label>New Password:</label>
                                <div className="input-group">
                                    <input
                                        type={showNewPassword ? "text" : "password"}
                                        className="form-control"
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                    />
                                    <div className="input-group-append">
                                        <span
                                            className="input-group-text"
                                            onClick={toggleNewPasswordVisibility}
                                            style={{ cursor: "pointer" }}
                                        >
                                            <FontAwesomeIcon
                                                icon={showNewPassword ? faEyeSlash : faEye}
                                            />
                                        </span>
                                    </div>
                                </div>
                            </div>
                            {passwordError && <p>{passwordError}</p>}
                            <button
                                className="btn btn-primary mt-3"
                                onClick={handleChangePassword}
                            >
                                Change Password
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
