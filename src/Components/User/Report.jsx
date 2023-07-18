import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

export default function Report() {
  const [bugDescription, setBugDescription] = useState('');

  const submitBug = async () => {
    if (bugDescription.length > 0) {
      const token = localStorage.getItem('token');
      const bugData = { token, bugDescription };

      try {
        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/bugs`, bugData);

        if (response.data.status) {
          setBugDescription('');
        }
        Swal.fire(
          'Bug Reported',
          'Thank you for reporting!',
          'success'
        )
      } catch (error) {
        console.error('Error submitting bug:', error);
      }
    }
    else {
      let timerInterval
      Swal.fire({
        title: 'Empty Bug',
        html: 'Please enter a bug',
        timer: 2000,
        timerProgressBar: true,
        willClose: () => {
          clearInterval(timerInterval)
        }
      })
    }
  };

  return (
    <div className="container my-5">
      <h2>REPORT A BUG:</h2>
      <div className="my-5">
        <label htmlFor="exampleFormControlTextarea1" className="form-label">
          BUG Description
        </label>
        <textarea
          className="form-control"
          id="exampleFormControlTextarea1"
          rows="3"
          value={bugDescription}
          onChange={e => setBugDescription(e.target.value)}
          required />
      </div>
      <div className="my-2">
        <center id='submitted'>
          <button type="submit" onClick={submitBug} className="btn btn-secondary">
            SUBMIT
          </button>
        </center>
      </div>
    </div>
  );
}
