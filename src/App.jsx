import React from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import jwt_decode from 'jwt-decode';
import Usernav from './Components/User/Usernav'
import Report from './Components/User/Report'
import Update from './Components/User/Update'
import Reporternav from './Components/Reporter/Reporternav'
import Newreports from './Components/Reporter/Newreports'
import Fromusers from './Components/Reporter/Fromusers'
import Sentreq from './Components/Reporter/Sentreq'
import Adminnav from './Components/Admin/Adminnav'
import Deployment from './Components/Admin/Deployment'
import Current from './Components/Admin/Current'
import Developernav from './Components/Developer/Developernav'
import Patches from './Components/Developer/Patches'
import Qualitynav from './Components/Quality/Qualitynav'
import Verification from './Components/Quality/Verification'
import Signup from './Components/Common/Signup'
import Login from './Components/Common/Login'
import Error from './Components/Error'
import Register from './Components/Admin/Register'
import Transaction from './Components/Common/Transaction';
import Profile from './Components/Common/Profile';

export default function App() {
  const token = localStorage.getItem('token');
  const decodedToken = token ? jwt_decode(token) : null;
  const role = decodedToken ? decodedToken.role : null;


  return (
    <BrowserRouter>
      <Routes>
        {role === 'Developer' && (
          <Route path="/" element={<Developernav />}>
            <Route index element={<Patches />} />
            <Route path='requests' element={<Patches />} />
            <Route path='transactions' element={<Transaction />} />
            <Route path='profile' element={<Profile />} />
          </Route>
        )}

        {role === 'Admin' && (
          <Route path="/" element={<Adminnav />}>
            <Route index element={<Deployment />} />
            <Route path='deployment' element={<Deployment />} />
            <Route path='current-request' element={<Current />} />
            <Route path='register-new' element={<Register />} />
            <Route path='transactions' element={<Transaction />} />
            <Route path='profile' element={<Profile />} />
          </Route>
        )}

        {role === 'Quality Analyst' && (
          <Route path="/" element={<Qualitynav />}>
            <Route index element={<Verification />} />
            <Route path='check' element={<Verification />} />
            <Route path='transactions' element={<Transaction />} />
            <Route path='profile' element={<Profile />} />
          </Route>
        )}

        {role === 'Reporter' && (
          <Route path="/" element={<Reporternav />}>
            <Route index element={<Newreports />} />
            <Route path='report-new' element={<Newreports />} />
            <Route path='from-users' element={<Fromusers />} />
            <Route path='previous-requests' element={<Sentreq />} />
            <Route path='transactions' element={<Transaction />} />
            <Route path='profile' element={<Profile />} />
          </Route>
        )}

        {role === 'User' && (
          <Route path="/" element={<Usernav />}>
            <Route index element={<Report />} />
            <Route path='report' element={<Report />} />
            <Route path='updates' element={<Update />} />
            <Route path='profile' element={<Profile />} />
          </Route>
        )}

        <Route path="/signup" exact element={<Signup />} />
        <Route path="/login" exact element={<Login />} />
        <Route path="/" element={<Navigate replace to="/login" />} />
        <Route path='*' element={<Error />} />
      </Routes>
    </BrowserRouter>
  )
}
