import React, { useState } from 'react';
import axios from 'axios';


export default function Report() {
  const [bugDescription, setBugDescription] = useState('');

  const submitBug = async () => {
    const token = localStorage.getItem('token');
    const bugData = { token, bugDescription };

    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/bugs`, bugData);

      if (response.data.status) {
        const k = document.getElementById('submitted');
        k.innerHTML = `BUG SENT SUCCESSFULLY<br>THANK YOU`;
        setBugDescription('');
      }
    } catch (error) {
      console.error('Error submitting bug:', error);
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
        ></textarea>
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
