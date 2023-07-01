import React, { useEffect } from 'react'
import { ABI, Address } from '../Solidity'
import Web3 from 'web3';
import { Web3Storage } from 'web3.storage';
import axios from 'axios';
export default function Patches() {

    let account, data;
    useEffect(() => {
        fromAdmin();
    }, []);

    const sendtoVerify = async (i) => {
        if (window.ethereum !== "undefined") {
            const accounts = await ethereum.request({ method: "eth_requestAccounts" });
            account = accounts[0];
            window.web3 = new Web3(window.ethereum);
            window.contract = await new window.web3.eth.Contract(ABI, Address);
            data = await window.contract.methods.getRequests().call();
            console.log(data)
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
                const cid = await client.put([updatedFile]); // Upload the updated file
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
            window.web3 = await new Web3(window.ethereum);
            window.contract = await new window.web3.eth.Contract(ABI, Address);
            data = await window.contract.methods.getRequests().call();

            console.log(data)
            if (data.length >= 1) {
                let temp = data[data.length - 1];
                if (data != null) {
                    document.getElementById('nopatch').innerHTML = ''
                }
                let dd = temp.patchDescription.split("\n");

                let latestone = `<h2 class="accordion-header">
                <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#req${data.length - 1}"
                    aria-expanded="true" aria-controls="req${data.length - 1}">
                    ${temp.patchName}
                </button>
            </h2>
            <div id="req${data.length - 1}" class="accordion-collapse collapse show" data-bs-parent="#accordionExample">
                <div class="accordion-body">
                <small>SENT AT: ${temp.timeofReport}</small><br>
                <div class="container border my-2 p-3">
                <h5>PATCH DESCRIPTION<br></h5>`
                for (let j in dd) {
                    latestone += `${dd[j]}<br>`
                }
                latestone += `</div>
                    <div class="row mt-3 gx-3">
                        <div class="col">
                            <div class="list-group" id="bugsof${data.length - 1}"></div>
                            </div>
                            <div class="col">
                            <div class="list-group" id="featuresof${data.length - 1}"></div>
                        </div>
                    </div><div class="form-floating mb-3">
                <input type="number" class="form-control mt-3" id="versionfor${temp.patchName}" placeholder="VERSION NUMBER">
                <label for="versionfor${temp.patchName}">VERSION NUMBER</label>
                <div class="mb-3">
                    <label for="filefor${data.length - 1}" class="form-label mt-3">Upload Patch</label>
                    <input class="form-control" type="file" id="filefor${data.length - 1}">
                </div>
            </div>`
                if (temp.uploaded == 0) {
                    latestone += `<center id="uploadstatus${data.length - 1}">
                    </center>`
                }
                else if (temp.uploaded == -1) {
                    latestone += `<center id="uploadstatus${data.length - 1}">
                    REJECTED BY QA<br>PLEASE DELETE THE OLDER FILES IN WEB3 AND UPLOAD A NEW FILE HERE<br>
                    
                </center>`
                }
                else if (temp.uploaded == 1 && temp.approved == 1) {
                    latestone += `<center id="uploadstatus${data.length - 1}">
                    APPROVED BY QA
                </center>`
                }
                else if (temp.uploaded == 1) {
                    latestone += `<center id="uploadstatus${data.length - 1}">
                    UPLOADED SUCCESSFULLY
                </center>`
                }
                latestone += `</div>
                </div>`
                let latest = document.createElement('div');
                latest.className = 'accordion-item';
                latest.innerHTML = latestone;
                const accordionExampleDiv = document.getElementById('accordionExample');
                accordionExampleDiv.appendChild(latest);
                const bugsDiv = document.getElementById(`bugsof${data.length - 1}`);
                for (let j in temp.bugRequest) {
                    let temp1 = temp.bugRequest[j];
                    const li = document.createElement('li');
                    li.className = 'list-group-item list-group-item-action';
                    li.innerHTML = `
                                <div class="d-flex w-100 justify-content-between">
                                <h5 class="mb-1">${temp1[0]}</h5>
                                </div>
                                <p class="mb-1">${temp1[1]}</p>
                                <small>PRIORITY: ${temp1[2]}</small>`;
                    bugsDiv.appendChild(li);
                }
                const featuresDiv = document.getElementById(`featuresof${data.length - 1}`);
                for (let j in temp.featureRequest) {
                    let temp1 = temp.featureRequest[j];
                    const li = document.createElement('li');
                    li.className = 'list-group-item list-group-item-action';
                    li.innerHTML = `
                            <div class="d-flex w-100 justify-content-between">
                                <h5 class="mb-1">${temp1[0]}</h5>
                            </div>
                            <p class="mb-1">${temp1[1]}</p>
                            <small>PRIORITY: ${temp1[2]}</small>`;
                    featuresDiv.appendChild(li);
                }
                if (temp.approved == 1) {
                    document.getElementById(`uploadstatus${data.length - 1}`).innerHTML = `APPROVED BY QA`
                }
                for (let i = data.length - 2; i >= 0; i--) {
                    let forDeveloper = '';
                    let temp = data[i];
                    let dd = temp.patchDescription.split("\n");
                    forDeveloper += `<h2 class="accordion-header">
                <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#req${i}"
                    aria-expanded="`
                    if (temp.approved == -1 || temp.uploaded != 1) {
                        forDeveloper += `true`
                    }
                    else {
                        forDeveloper += `false`
                    }

                    forDeveloper += `" aria-controls="req${i}">
                    ${temp.patchName}
                    </button>
                    </h2>
                    <div id="req${i}" class="accordion-collapse collapse`
                    if (temp.approved == -1 || temp.uploaded != 1) forDeveloper += `show`
                    else forDeveloper += ``
                    forDeveloper += `" data-bs-parent="#accordionExample">
                <div class="accordion-body">
                <small>SENT AT: ${temp.timeofReport}</small><br>
                <div class="container border my-2 p-3">
                <h5>PATCH DESCRIPTION<br></h5>`
                    for (let j in dd) forDeveloper += `${dd[j]}<br>`
                    forDeveloper += `</div>
                    <div class="row mt-3 gx-3">
                        <div class="col">
                            <div class="list-group" id="bugsof${i}"></div>
                            </div>
                            <div class="col">
                            <div class="list-group" id="featuresof${i}"></div>
                        </div>
                        </div><div class="form-floating mb-3">
                <input type="number" class="form-control mt-3" id="versionfor${temp.patchName}" placeholder="VERSION NUMBER">
                <label for="versionfor${temp.patchName}">VERSION NUMBER</label>
                <div class="mb-3">
                    <label for="filefor${i}" class="form-label mt-3">Upload Patch</label>
                    <input class="form-control" type="file" id="filefor${i}">
                </div>
                </div>`
                    if (temp.uploaded == 0) {
                        forDeveloper += `<center id="uploadstatus${i}">
                    </center>`
                    }
                    else if (temp.uploaded == -1) {
                        forDeveloper += `<center id="uploadstatus${i}">
                    REJECTED BY QA<br>
                    
                </center>`
                    }
                    else if (temp.uploaded == 1 && temp.approved == 1) {
                        forDeveloper += `<center id="uploadstatus${i}">
                    APPROVED BY QA
                </center>`
                    }
                    else if (temp.uploaded == 1) {
                        forDeveloper += `<center id="uploadstatus${i}">
                    UPLOADED SUCCESSFULLY
                </center>`
                    }
                    forDeveloper += `</div>
                </div>`
                    let prev = document.createElement('div');
                    prev.className = 'accordion-item';
                    prev.innerHTML = forDeveloper;
                    const accordionExampleDiv = document.getElementById('accordionExample');
                    accordionExampleDiv.appendChild(prev);
                    const bugsDiv = document.getElementById(`bugsof${i}`);
                    for (let j in temp.bugRequest) {
                        let temp1 = temp.bugRequest[j];
                        const li = document.createElement('li');
                        li.className = 'list-group-item list-group-item-action';
                        li.innerHTML = `
                                <div class="d-flex w-100 justify-content-between">
                                <h5 class="mb-1">${temp1[0]}</h5>
                                </div>
                                <p class="mb-1">${temp1[1]}</p>
                                <small>PRIORITY: ${temp1[2]}</small>`;
                        bugsDiv.appendChild(li);
                    }
                    const featuresDiv = document.getElementById(`featuresof${i}`);
                    for (let j in temp.featureRequest) {
                        let temp1 = temp.featureRequest[j];
                        const li = document.createElement('li');
                        li.className = 'list-group-item list-group-item-action';
                        li.innerHTML = `
                    <div class="d-flex w-100 justify-content-between">
                    <h5 class="mb-1">${temp1[0]}</h5>
                    </div>
                    <p class="mb-1">${temp1[1]}</p>
                    <small>PRIORITY: ${temp1[2]}</small>`;
                        featuresDiv.appendChild(li);
                    }
                    if (temp.approved == 1) {
                        document.getElementById(`uploadstatus${i}`).innerHTML = `APPROVED BY QA`
                    }
                    console.log(data.length)
                }
                for (let i = 0; i < data.length; i++) {
                    let temp = data[i];
                    let button = document.createElement("button");
                    if (temp.uploaded == 0) {
                        button.className = "btn btn-secondary";
                        button.textContent = "UPLOAD";
                    } else if (temp.uploaded == -1) {
                        button.className = "btn btn-danger";
                        button.textContent = "RE UPLOAD";
                    }
                    button.onclick = function () {
                        sendtoVerify(i);
                    };
                    if (temp.uploaded != 1) {
                        let centerTag = document.getElementById(`uploadstatus${i}`);
                        centerTag.appendChild(button);
                    }
                }
            }

        }
    }



    return (

        <div className="container my-3 bg-light p-3" id="list">
            <div className="accordion" id="accordionExample"></div>
            <center className="mt-3" id="nopatch"><h6>NONE </h6></center>

        </div>
    )
}
