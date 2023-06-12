import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import 'datatables.net';
import 'datatables.net-dt/css/jquery.dataTables.css';
import 'datatables.net-dt';
import '@fortawesome/fontawesome-free/css/all.css'; 
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js'; 


ReactDOM.createRoot(document.getElementById('root')).render(
  <>
    <App />
  </>,
)
