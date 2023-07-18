import React, { useState } from 'react';
import axios from 'axios';
import { Link, Outlet } from 'react-router-dom';


export default function Login() {
    const [data, setData] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = ({ currentTarget: input }) => {
        setData({ ...data, [input.name]: input.value });
    };

    const handleSubmit = async (e) => {
        console.log("Entered")
        e.preventDefault();
        console.log(import.meta.env.VITE_BASE_URL)
        try {
            const url = `${import.meta.env.VITE_BASE_URL}/login`;
            console.log(url)
            const { data: res } = await axios.post(url, data);
            localStorage.setItem('token', res.data);
            window.location = '/';
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

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <>
            <div className='d-flex align-items-center justify-content-center vh-100'>
                <form
                    onSubmit={handleSubmit}
                    style={{
                        width: '400px',
                        border: '1px solid #ccc',
                        borderRadius: '5px',
                        padding: '40px'
                    }}
                >
                    <h1 className='h3 mb-3 fw-normal'>Please Log in</h1>

                    <div className='form-floating'>
                        <input
                            type='email'
                            name='email'
                            onChange={handleChange}
                            value={data.email}
                            required
                            className='form-control mb-2'
                            id='floatingInput'
                            placeholder='name@example.com'
                        />
                        <label htmlFor='floatingInput'>Email address</label>
                    </div>
                    <div className='form-floating'>
                        <input
                            type={showPassword ? 'text' : 'password'}
                            name='password'
                            onChange={handleChange}
                            value={data.password}
                            required
                            className='form-control'
                            id='floatingPassword'
                            placeholder='Password'
                        />
                        <label htmlFor='floatingPassword'>Password</label>
                        <div className='form-check my-2'>
                            <input
                                className='form-check-input'
                                type='checkbox'
                                value=''
                                id='showPassword'
                                checked={showPassword}
                                onChange={toggleShowPassword}
                            />
                            <label className='form-check-label ' htmlFor='showPassword'>
                                Show password
                            </label>
                        </div>
                    </div>
                    {error && (
                        <div className='alert alert-danger' role='alert'>
                            {error}
                        </div>
                    )}
                    <button className='btn btn-primary w-100 py-2' type='submit'>
                        Sign in
                    </button>

                    {/* <div className='mt-3'>
                        <a href='#'>Forgot Password</a>
                    </div> */}
                    <div className='mt-2'>
                        <span>
                            Don't have an Account? <Link to='/signup'>Sign up</Link>
                        </span>
                    </div>
                </form>
            </div>
            <Outlet />
        </>
    );
}
