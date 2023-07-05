import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Profile() {
    const [profile, setProfile] = useState({});
    const [password, setPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [passwordError, setPasswordError] = useState("");

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
                console.log("Edited")
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

    return (
        <div>
            <h1>Profile Details</h1>
            <p>First Name: {profile.firstName}</p>
            <p>Last Name: {profile.lastName}</p>
            <p>Email: {profile.email}</p>
            <p>Role: {profile.role}</p>

            <h2>Change Password</h2>
            <div>
                <label>Current Password:</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <div>
                <label>New Password:</label>
                <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                />
            </div>
            {passwordError && <p>{passwordError}</p>}
            <button onClick={handleChangePassword}>Change Password</button>
        </div>
    );
};


