import React, { useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import axios from 'axios';


const Signup = () => {
    const [data, setData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: ''
    });

    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleChange = ({ currentTarget: input }) => {
        setData({ ...data, [input.name]: input.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const url = `${import.meta.env.VITE_BASE_URL}/signup`;
            const { data: res } = await axios.post(url, data);
            navigate('/login');
            console.log(res.message);
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
                        width: '500px',
                        border: '1px solid #ccc',
                        borderRadius: '5px',
                        padding: '40px'
                    }}
                >
                    <h1 className='h3 mb-3 fw-normal'>Please sign up</h1>

                    <div className='row mb-2'>
                        <div className='col'>
                            <div className='form-floating'>
                                <input
                                    type='text'
                                    className='form-control'
                                    name='firstName'
                                    value={data.firstName}
                                    onChange={handleChange}
                                    id='floatingFirstName'
                                    placeholder='First Name'
                                    required
                                />
                                <label htmlFor='floatingFirstName'>First Name</label>
                            </div>
                        </div>
                        <div className='col'>
                            <div className='form-floating'>
                                <input
                                    type='text'
                                    className='form-control'
                                    name='lastName'
                                    value={data.lastName}
                                    onChange={handleChange}
                                    id='floatingLastName'
                                    placeholder='Last Name'
                                    required
                                />
                                <label htmlFor='floatingLastName'>Last Name</label>
                            </div>
                        </div>
                    </div>
                    <div className='form-floating mb-2'>
                        <input
                            type='email'
                            className='form-control'
                            name='email'
                            value={data.email}
                            onChange={handleChange}
                            id='floatingInput'
                            placeholder='name@example.com'
                            required
                        />
                        <label htmlFor='floatingInput'>Email address</label>
                    </div>
                    <div className='form-floating mb-2'>
                        <input
                            type={showPassword ? 'text' : 'password'}
                            className='form-control mb-3'
                            name='password'
                            value={data.password}
                            onChange={handleChange}
                            id='floatingPassword'
                            placeholder='Password'
                            required
                        />
                        <label htmlFor='floatingPassword'>Password</label>
                        <div className='form-check mt-2'>
                            <input
                                className='form-check-input'
                                type='checkbox'
                                value=''
                                id='showPassword'
                                checked={showPassword}
                                onChange={toggleShowPassword}
                            />
                            <label className='form-check-label' htmlFor='showPassword'>
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
                        Sign up
                    </button>

                    <div className='mt-2'>
                        <span>
                            Already have an account? <Link to='/login'>Sign in</Link>
                        </span>
                    </div>
                </form>
            </div>
            <Outlet />
        </>
    );
};

export default Signup;
