import React, { useEffect, useState } from 'react'
import { ABI, Address } from '../Common/Solidity'
import Web3 from 'web3';
import { Web3Storage } from 'web3.storage';
import axios from 'axios';
export default function Patches() {

    let account;
    const [data, setData] = useState([]);
    useEffect(() => {
        fromAdmin();
    }, []);

    const sendtoVerify = async (i) => {
        if (window.ethereum !== "undefined") {
            const accounts = await ethereum.request({ method: "eth_requestAccounts" });
            account = accounts[0];
            // console.log(data)
            let patchName = data[i].patchName;
            let patchVersion = document.getElementById(`versionfor${data[i].patchName}`).value;
            const fileInput = document.getElementById(`filefor${i}`);
            const file = fileInput.files[0];
            let fileName = file.name;
            let fileExt = fileName.split('.').pop().toLowerCase(); // Get the file extension

            const client = new Web3Storage({
                token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDY3OGUyNDU5OTRFNjM2NjU1ODE0YzZDNTM5OTU2MUMxYjM4MGY0QjUiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2ODc5NDQzMjI4MjQsIm5hbWUiOiJCbG9ja0NoYWluUGF0Y2hNYW5hZ2VtZW50In0.aYtIAHBZgV13SieJ5rY4ol319uT3po6SPvcJfhrNgK0"
            });

            // Prepare the file metadata
            const metadata = {
                name: fileName,
                type: fileExt,
            };

            // Create a new File object with the updated name and type
            const updatedFile = new File([file], fileName, metadata);

            try {
                const cid = await client.put([updatedFile]);
                console.log(cid) // Upload the updated file
                let dateofupload = new Date().toString().split(" ");
                let timeofupload = dateofupload[2] + " " + dateofupload[1] + " " + dateofupload[3] + " " + dateofupload[4] + " " + dateofupload[5];
                const result = await contract.methods.uploadedbyDev(timeofupload, patchName, patchVersion, fileName, cid).send({ from: account });
                const transactionData = {
                    ...result,
                    token: localStorage.getItem('token'),
                    transactionDone: "Patch Uploaded"
                };

                try {
                    const url = 'http://localhost:8080/transactions'
                    await axios.post(url, transactionData);
                    console.log('Transaction saved successfully');
                } catch (error) {
                    console.log('Error saving transaction:', error);
                }
                document.getElementById(`uploadstatus${i}`).innerHTML = "UPLOADED SUCCESSFULLY";
            } catch (error) {
                console.error("Error uploading file:", error);
            }
        }
    };


    const fromAdmin = async () => {
        if (window.ethereum !== "undefined") {
            const accounts = await ethereum.request({ method: "eth_requestAccounts" });
            account = accounts[0];
            window.web3 = new Web3(window.ethereum);
            window.contract = await new window.web3.eth.Contract(ABI, Address);
            const fetchedData = await window.contract.methods.getRequests().call();
            console.log(fetchedData)
            const reversedData = [...fetchedData].reverse();
            setData(reversedData);
        }
    }



    return (

        <div className="container my-3 bg-light p-3" id="list">
            <div className="accordion" id="accordionExample">
                {data.length == 0 && <center className="mt-3"><h6>NONE</h6></center>}
                {data.map((temp, i) => {
                    console.log(temp)
                    const dd = temp.patchDescription.split("\n");
                    return (
                        <div className="accordion-item" key={i}>
                            <h2 className="accordion-header">
                                <button
                                    className={`accordion-button ${(i != 0 || temp.approved == -1) ? "collapsed" : ""}`}
                                    type="button"
                                    data-bs-toggle="collapse"
                                    data-bs-target={`#req${i}`}
                                    aria-expanded={(i == 0 || temp.approved == -1) ? "true" : "false"}
                                    aria-controls={`req${i}`}
                                >
                                    {temp.patchName}
                                </button>
                            </h2>
                            <div
                                id={`req${i}`}
                                className={`accordion-collapse collapse ${(i == 0 || temp.approved == -1) ? "show" : ""}`}
                                data-bs-parent="#accordionExample"
                            >
                                <div className="accordion-body">
                                    <small>SENT AT: {temp.timeofReport}</small><br />
                                    <div className="container border my-2 p-3"><h5>PATCH DESCRIPTION</h5>
                                        {dd.map((item, j) => {
                                            return (
                                                <p key={j}>{item}</p>
                                            )
                                        })}
                                        <div className="row mt-3 gx-3">
                                            <div className="col">
                                                <div className="list-group" id={`bugsof${i}`}>
                                                    {temp.bugRequest.map((temp1, j) => (
                                                        <li className="list-group-item list-group-item-action" key={j}>
                                                            <div className="d-flex w-100 justify-content-between">
                                                                <h5 className="mb-1">{temp1.bugTitle}</h5>
                                                            </div>
                                                            <p className="mb-1">{temp1.bugDescription}</p>
                                                            <small>PRIORITY: {temp1.bugPriority}</small>
                                                        </li>
                                                    ))}
                                                </div>
                                            </div>
                                            <div className="col">
                                                <div className="list-group" id={`featuresof${i}`}>
                                                    {temp.featureRequest.map((temp1, j) => (
                                                        <li className="list-group-item list-group-item-action" key={j}>
                                                            <div className="d-flex w-100 justify-content-between">
                                                                <h5 className="mb-1">{temp1.featureTitle}</h5>
                                                            </div>
                                                            <p className="mb-1">{temp1.featureDescription}</p>
                                                            <small>PRIORITY: {temp1.featurePriority}</small>
                                                        </li>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-floating mb-3">

                                        <input type="number" className="form-control mt-3" id={`versionfor${temp.patchName}`} defaultValue={`${temp.vno > 0 ? `${temp.vno}` : ''}`} placeholder="VERSION NUMBER" />
                                        <label htmlFor={`versionfor${temp.patchName}`}>VERSION NUMBER</label>
                                        <div className="mb-3">
                                            <label htmlFor={`filefor${i}`} className="form-label mt-3">Upload Patch</label>
                                            <input className="form-control" type="file" id={`filefor${i}`} />
                                        </div>
                                    </div>
                                    {temp.deployed && <center id={`uploadstatus${i}`}>DEPLOYED</center>}
                                    {temp.uploaded == 0 && temp.approved == 0 && <center id={`uploadstatus${i}`}><button className='btn btn-secondary' onClick={() => { sendtoVerify(i) }}>SUBMIT</button></center>}
                                    {temp.uploaded == 1 && (temp.approved == 0 || temp.approved == -1) && <center id={`uploadstatus${i}`}>UPLOADED SUCCESSFULLY</center>}
                                    {temp.uploaded == 1 && temp.approved == 1 && !temp.deployed && <center id={`uploadstatus${i}`}>APPROVED BY QA</center>}
                                    {temp.uploaded == -1 && temp.approved == -1 && <center id={`uploadstatus${i}`}>REJECTED BY QA<br /><button className='btn btn-danger' onClick={() => { sendtoVerify(i) }}>RE-SUBMIT</button></center>}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

        </div>
    )
}