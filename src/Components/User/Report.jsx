import React, { useState } from 'react';

export default function Report() {
  const [email, setEmail] = useState('');
  const [bugDescription, setBugDescription] = useState('');

  const submitBug = async () => {
  const bugData = { email, bugDescription };

  try {
    await fetch('http://localhost:5000/create-bug', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bugData),
    })
      .then(
        response=>response.json()
      ).then(
        data=> {
          if(data.status){
            const k = document.getElementById('submitted');
            k.innerHTML=`BUG SENT SUCCESSFULLY<br>THANK YOU`;
            setEmail('');
            setBugDescription('');
          }
        }
      );
  } catch (error) {
    console.error('Error submitting bug:', error);
  }
};

  return (
    <div className="container my-5">
      <h2>REPORT A BUG:</h2>
      <div className="my-3">
        <label htmlFor="exampleFormControlInput1" className="form-label">
          Email address
        </label>
        <input
          type="email"
          className="form-control"
          id="exampleFormControlInput1"
          placeholder="name@example.com"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
      </div>
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
          <button type="submit"  onClick={submitBug} className="btn btn-secondary">
            SUBMIT
          </button>
        </center>
      </div>
    </div>
  );
}
