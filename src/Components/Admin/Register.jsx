import React, { useState } from 'react';
import axios from 'axios';
import Web3 from 'web3';

export default function Register() {
    const initialState = {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        privateKey: '',
        address: '',
        role: 'Reporter'
    };

    const [data, setData] = useState(initialState);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData((prevData) => ({
            ...prevData,
            [name]: value
        }));

        if (name === 'firstName') {
            const updatedPassword = `${new Date().getFullYear()}_${value}`;
            setData((prevData) => ({
                ...prevData,
                password: updatedPassword
            }));
        }

        if (name === 'privateKey') {
            try {
                const web3 = new Web3();
                const address = web3.eth.accounts.privateKeyToAccount(value).address;
                setData((prevData) => ({
                    ...prevData,
                    address: address
                }));
                setError('');
            } catch (error) {
                setData((prevData) => ({
                    ...prevData,
                    address: ''
                }));
                setError('Invalid private key');
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const url = 'http://localhost:8080/employees';
            const res = await axios.post(url, data);
            setData(initialState);
            setError('');
        } catch (error) {
            if (
                error.response &&
                error.response.status >= 400 &&
                error.response.status <= 500
            ) {
                setError(error.response.data.message);
            }
        }
    };

    return (
        <div
            className="d-flex align-items-center justify-content-center"
            style={{ minHeight: '100vh', display: 'flex' }}
        >
            <form
                onSubmit={handleSubmit}
                style={{
                    width: '500px',
                    padding: '40px'
                }}
            >
                <h1 className="h3 mb-3 fw-normal">Register a New Employee:</h1>

                <div className="form-floating mb-2">
                    <input
                        type="text"
                        className="form-control"
                        name="firstName"
                        value={data.firstName}
                        onChange={handleChange}
                        id="floatingFirstName"
                        placeholder="First Name"
                        required
                    />
                    <label htmlFor="floatingFirstName">First Name</label>
                </div>

                <div className="form-floating mb-2">
                    <input
                        type="text"
                        className="form-control"
                        name="lastName"
                        value={data.lastName}
                        onChange={handleChange}
                        id="floatingLastName"
                        placeholder="Last Name"
                        required
                    />
                    <label htmlFor="floatingLastName">Last Name</label>
                </div>

                <div className="form-floating mb-2">
                    <input
                        type="email"
                        className="form-control"
                        name="email"
                        value={data.email}
                        onChange={handleChange}
                        id="floatingInput"
                        placeholder="name@example.com"
                        required
                    />
                    <label htmlFor="floatingInput">Email address</label>
                </div>

                <div className="form-floating mb-2">
                    <input
                        type="text"
                        className="form-control"
                        name="privateKey"
                        value={data.privateKey}
                        onChange={handleChange}
                        id="floatingPrivateKey"
                        placeholder="Private Key"
                        required
                    />
                    <label htmlFor="floatingPrivateKey">Private Key</label>
                </div>

                {data.address && (
                    <div className="alert alert-success mb-2" role="alert">
                        Ethereum Address: {data.address}
                    </div>
                )}

                {error && (
                    <div className="alert alert-danger mb-2" role="alert">
                        {error}
                    </div>
                )}

                <div className="form-floating mb-2">
                    <select
                        className="form-select"
                        name="role"
                        value={data.role}
                        onChange={handleChange}
                        id="floatingRole"
                        required
                    >
                        <option value="Reporter">Reporter</option>
                        <option value="Developer">Developer</option>
                        <option value="Admin">Admin</option>
                        <option value="Quality Analyst">Quality Analyst</option>
                    </select>
                    <label htmlFor="floatingRole">Role</label>
                </div>

                <button className="btn btn-secondary mt-3 w-100 py-2" type="submit">
                    Register
                </button>
            </form>
        </div>
    );
}
