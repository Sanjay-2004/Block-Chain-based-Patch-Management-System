import React, { useEffect, useState } from 'react'
import { ABI, Address } from '../Common/Solidity'
import Web3 from 'web3';
import { Web3Storage } from 'web3.storage';
import $ from 'jquery';
import axios from 'axios';
import jwt_decode from 'jwt-decode';


export default function Verification() {

  let account;
  const [data, setData] = useState([]);
  useEffect(() => {
    fromDev();
  }, []);
  const client = new Web3Storage({
    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDY3OGUyNDU5OTRFNjM2NjU1ODE0YzZDNTM5OTU2MUMxYjM4MGY0QjUiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2ODkzMTcyODczNTAsIm5hbWUiOiJDaGVja2luZyJ9.DJFrxfYvpgp364lOhMCV9CZj6P8zPxE6n3z_NAooIKs"
  });

  const verified = async (i) => {
    if (window.ethereum !== "undefined") {
      const token = localStorage.getItem('token');
      const decodedToken = token ? jwt_decode(token) : null;
      const address = decodedToken ? decodedToken.address : null;
      const accounts = await ethereum.request({ method: "eth_requestAccounts" });
      account = accounts[0];
      window.web3 = new Web3(window.ethereum);
      window.contract = await new window.web3.eth.Contract(ABI, Address);
      let pname = data[i].patchName;
      let approved = document.querySelector(`input[name="approval${i}"]:checked`).value;
      let stat;
      if (approved == "ACCEPTED") stat = 1;
      else if (approved == "REJECTED") stat = -1;
      console.log(stat);
      let arr = new Date().toString().split(" ");
      let date_rn = arr[2] + " " + arr[1] + " " + arr[3] + " " + arr[4] + " " + arr[5];
      console.log(date_rn)
      console.log(typeof (stat))
      console.log(pname)
      const result = await window.contract.methods.approval(date_rn, stat, pname).send({ from: address });
      const transactionData = {
        ...result,
        token: localStorage.getItem('token'),
      };
      if (stat == 1)
        transactionData.transactionDone = "Patch Approved"
      else
        transactionData.transactionDone = "Patch Rejected"
      try {
        const url = `${import.meta.env.VITE_BASE_URL}/transactions`
        await axios.post(url, transactionData);
        console.log('Transaction saved successfully');
      } catch (error) {
        console.log('Error saving transaction:', error);
      }
      document.getElementById(`deployed${i}`).innerHTML = "SENT SUCCESSFULLY"

    }
  }

  const getUrl = async (temp) => {
    const cid = temp.cid;
    console.log(cid)
    const res = await client.get(cid);
    const files = await res.files();
    const file = files[0];
    const anchor = document.createElement('a');
    const url = URL.createObjectURL(file);
    anchor.href = url;
    anchor.download = temp.filename;
    anchor.click();
    URL.revokeObjectURL(url);
  }


  const fromDev = async () => {
    if (window.ethereum !== "undefined") {
      const accounts = await ethereum.request({ method: "eth_requestAccounts" });
      account = accounts[0]
      window.web3 = new Web3(window.ethereum);
      window.contract = await new window.web3.eth.Contract(ABI, Address);
      const fetchedData = await window.contract.methods.getRequests().call();
      console.log(typeof (fetchedData));
      const reversedData = [...fetchedData].reverse();
      setData(reversedData);
      $(function () {
        $('#example').DataTable();
      });
    }
  }


  return (
    <>
      <div className="container my-3 bg-light p-3" id="list">
        <table id="example" className="table table-striped">
          <thead>
            <tr>
              <th><center>Serial Number</center></th>
              <th><center>Patch Description</center></th>
              <th><center>Time of Upload</center></th>
              <th><center>Version Number</center></th>
              <th><center>Bugs and Features Cleared</center></th>
              <th><center>Download</center></th>
              <th><center>Approval</center></th>
              <th><center>Deployment Status</center></th>
            </tr>
          </thead>
          <tbody id="forcheck">
            {data.map((temp, i) => {
              console.log(temp)
              if (temp.vno.length > 0) {
                return (
                  <tr id={`row${i}`} key={i}>
                    <td><center><strong>{i + 1}</strong></center></td>
                    <td><center><button type="button" className="btn btn-secondary" data-bs-toggle="modal" data-bs-target={`#desc${i}`}>{temp.patchName}</button></center></td>
                    <td><center>{temp.timeofReport}</center></td>
                    <td><center><strong>{temp.vno}</strong></center></td>
                    <td><center><button type="button" className="btn btn-secondary" data-bs-toggle="modal" data-bs-target={`#data${i}`}>BUGS & FEATURES</button></center></td>
                    <td><button onClick={() => { getUrl(temp) }} className="btn btn-secondary">DOWNLOAD</button></td>
                    <td>
                      {(temp.approved == 0 || temp.approved == -1) && temp.uploaded == 1 && (
                        <div className="btn-group" role="group" aria-label="Basic radio toggle button group">
                          <input type="radio" className="btn-check" name={`approval${i}`} value="ACCEPTED" id={`accepted${i}`} autoComplete="off" defaultChecked />
                          <label className="btn btn-outline-success" htmlFor={`accepted${i}`}>ACCEPT</label>
                          <input type="radio" className="btn-check" name={`approval${i}`} value="REJECTED" id={`rejected${i}`} autoComplete="off" />
                          <label className="btn btn-outline-danger" htmlFor={`rejected${i}`}>REJECT</label>
                        </div>
                      )}
                      {temp.approved == 1 && temp.uploaded == 1 && (
                        <center>APPROVED</center>
                      )}
                      {temp.approved == -1 && temp.uploaded == -1 && (
                        <center>REJECTED</center>
                      )}
                    </td>
                    <td id={`deployed${i}`} >
                      {temp.approved == 0 && temp.uploaded == 1 && (
                        <center><button onClick={() => { verified(i) }} className='btn btn-secondary'>SUBMIT</button></center>
                      )}
                      {temp.approved == -1 && temp.uploaded == -1 && (
                        <center>RE-UPLOAD</center>
                      )}
                      {temp.approved == 1 && temp.deployed && (
                        <center>DEPLOYED</center>
                      )}
                      {temp.approved == 1 && !temp.deployed && (
                        <center>SENT TO ADMIN</center>
                      )}
                      {temp.approved == -1 && temp.uploaded == 1 && (
                        <center><button onClick={() => { verified(i) }} className='btn btn-danger'>RE-SUBMIT</button></center>
                      )}
                    </td>
                  </tr>
                )
              } else return null;
            })}
          </tbody>
        </table>
      </div>
      <div id="modals">
        {data.map((temp, i) => {
          const bugsDiv = temp.bugRequest.map((temp1, j) => (
            <li key={j} className="list-group-item list-group-item-action">
              <div className="d-flex w-100 justify-content-between">
                <h5 className="mb-1">{temp1[0]}</h5>
              </div>
              <p className="mb-1">{temp1[1]}</p>
              <small>PRIORITY: {temp1[2]}</small>
            </li>
          ));

          const featuresDiv = temp.featureRequest.map((temp1, j) => (
            <li key={j} className="list-group-item list-group-item-action">
              <div className="d-flex w-100 justify-content-between">
                <h5 className="mb-1">{temp1[0]}</h5>
              </div>
              <p className="mb-1">{temp1[1]}</p>
              <small>PRIORITY: {temp1[2]}</small>
            </li>
          ));

          const dd = temp.patchDescription.split('\n');
          const desc = dd.map((line, j) => <div key={j}>{line}<br /></div>);

          return (
            <React.Fragment key={i}>
              <div className="modal fade" id={`data${i}`} data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby={`data${i}Label`} aria-hidden="true">
                <div className="modal-dialog">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h1 className="modal-title fs-5" id={`data${i}Label`}>
                        Bugs and Features Cleared
                      </h1>
                      <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                      <div className="row mt-3 gx-3">
                        <div className="col">
                          <div className="list-group" id={`bugsof${i}`}>
                            {bugsDiv}
                          </div>
                        </div>
                        <div className="col">
                          <div className="list-group" id={`featuresof${i}`}>
                            {featuresDiv}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="modal fade" id={`desc${i}`} data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby={`descof${i}`} aria-hidden="true">
                <div className="modal-dialog">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h1 className="modal-title fs-5" id={`descof${i}`}>
                        PATCH DESCRIPTION
                      </h1>
                      <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                      {desc}
                    </div>
                  </div>
                </div>
              </div>
            </React.Fragment>
          );
        })}
      </div>
    </>
  )
}
