import React from 'react'
import { ABI, Address } from '../Solidity'
import '../Styles.css'
import Web3 from 'web3';
import axios from 'axios';

export default function Newreports() {
    let account;
    let bugsArray = [], featuresArray = [];

    const addBug = () => {
        let bugTitle = document.getElementById("bug-title").value;
        let bugDescription = document.getElementById("bug-description").value;
        let bugPriority = document.querySelector('input[name="bugs-priority"]:checked').value;
        bugsArray.push([bugTitle, bugDescription, bugPriority]);
        let bugsList = document.createElement('li');
        bugsList.className = 'list-group-item list-group-item-action';
        bugsList.setAttribute('aria-current', true);
        bugsList.innerHTML = `
    <div className="d-flex w-100 justify-content-between">
        <h5 className="mb-1">${bugTitle}</h5>
    </div>
    <p className="mb-1">${bugDescription}</p>
    <small>PRIORITY: ${bugPriority}</small>`;
        document.getElementById("bug-title").value = "";
        document.getElementById("bug-description").value = "";
        document.querySelector('input[name="bugs-priority"]:checked').checked = false;
        document.getElementById('selected_bugs').appendChild(bugsList);
    }

    const addFeature = () => {
        let featureTitle = document.getElementById("feature-title").value;
        let featureDescription = document.getElementById("feature-description").value;
        let featurePriority = document.querySelector('input[name="features-priority"]:checked').value;
        featuresArray.push([featureTitle, featureDescription, featurePriority]);
        let featuresList = document.createElement('li');
        featuresList.className = 'list-group-item list-group-item-action';
        featuresList.setAttribute('aria-current', true);
        featuresList.innerHTML = `
    <div className="d-flex w-100 justify-content-between">
        <h5 className="mb-1">${featureTitle}</h5>
    </div>
    <p className="mb-1">${featureDescription}</p>
    <small>PRIORITY: ${featurePriority}</small>`;
        document.getElementById("feature-title").value = "";
        document.getElementById("feature-description").value = "";
        document.querySelector('input[name="features-priority"]:checked').checked = false;
        document.getElementById('selected_features').appendChild(featuresList);
    }

    const sendData = async () => {
        if (window.ethereum !== "undefined") {
            const accounts = await ethereum.request({ method: "eth_requestAccounts" });
            account = accounts[0];
            let arr = new Date().toString().split(" ");
            let date_rn = arr[2] + " " + arr[1] + " " + arr[3] + " " + arr[4] + " " + arr[5];
            window.web3 = new Web3(window.ethereum);
            window.contract = await new window.web3.eth.Contract(ABI, Address);
            const result = await window.contract.methods.toAdmin(date_rn, bugsArray, featuresArray).send({ from: account });
            console.log("Transaction details: ", result);
            const transactionData = {
                ...result,
                token: localStorage.getItem('token'),
                transactionDone: "Bugs and Features reported"
            };

            try {
                const url = 'http://localhost:8080/transactions'
                await axios.post(url, transactionData);
                console.log('Transaction saved successfully');
            } catch (error) {
                console.log('Error saving transaction:', error);
            }
            document.getElementById("submit_button").innerHTML = "SUBMITTED SUCCESSFULLY"
            document.getElementById("selected_bugs").innerHTML = "NONE"
            document.getElementById("selected_features").innerHTML = "NONE"
        }
    }
    return (
        <div className="container mt-5 mb-3">
            <nav>
                <div className="nav nav-tabs" id="nav-tab" role="tablist">
                    <button className="nav-link active" id="bugs-report-tab" data-bs-toggle="tab" data-bs-target="#bugs-report"
                        type="button" role="tab" aria-controls="bugs-report" aria-selected="true">BUGS</button>
                    <button className="nav-link" id="features-tab" data-bs-toggle="tab" data-bs-target="#features" type="button"
                        role="tab" aria-controls="features" aria-selected="false">FEATURES</button>
                </div>
            </nav>
            <div className=" mt-3 tab-content" id="nav-tabContent">
                <div className="tab-pane fade show active" id="bugs-report" role="tabpanel" aria-labelledby="bugs-report-tab"
                    tabIndex="0">
                    <div className="form-floating mb-3">
                        <input type="text" className="form-control" id="bug-title" placeholder="BUG TITLE" />
                        <label htmlFor="bug-title">BUG TITLE</label>
                    </div>
                    <div className="form-floating mb-3">
                        <textarea className="descript form-control" placeholder="BUG DESCRIPTION"
                            id="bug-description"></textarea>
                        <label htmlFor="bug-description">BUG DESCRIPTION</label>
                    </div>
                    <div className="row gx-5">
                        <div className="col-lg-6 col-sm-12 my-2">
                            <h5>BUG PRIORITY</h5>
                            <input type="radio" className="btn-check me-2" name="bugs-priority" value="HIGH" id="bug-priority-high"
                                autoComplete="off" defaultChecked />
                            <label className="btn btn-outline-danger me-2" htmlFor="bug-priority-high">HIGH</label>
                            <input type="radio" className="btn-check me-2" name="bugs-priority" value="MEDIUM"
                                id="bug-priority-medium" autoComplete="off" />
                            <label className="btn btn-outline-warning me-2" htmlFor="bug-priority-medium">MEDIUM</label>
                            <input type="radio" className="btn-check me-2" name="bugs-priority" value="LOW" id="bug-priority-low"
                                autoComplete="off" />
                            <label className="btn btn-outline-success me-2" htmlFor="bug-priority-low">LOW</label>
                        </div>
                    </div>
                    <center className="mt-3">
                        <button type="submit" className="btn btn-secondary" onClick={addBug}>ADD BUG</button>
                    </center>
                </div>
                <div className="tab-pane fade" id="features" role="tabpanel" aria-labelledby="features-tab" tabIndex="0">
                    <div className="form-floating mb-3">
                        <input type="text" className="form-control" id="feature-title" placeholder="FEATURE TITLE" />
                        <label htmlFor="feature-title">FEATURE TITLE</label>
                    </div>
                    <div className="form-floating mb-3">
                        <textarea className="descript form-control" placeholder="FEATURE DESCRIPTION"
                            id="feature-description"></textarea>
                        <label htmlFor="feature-description">FEATURE DESCRIPTION</label>
                    </div>
                    <div className="priority my-4">
                        <h5>FEATURE PRIORITY</h5>
                        <input type="radio" className="btn-check me-2" name="features-priority" value="HIGH" id="feature-high"
                            autoComplete="off" defaultChecked />
                        <label className="btn btn-outline-danger me-2" htmlFor="feature-high">HIGH</label>

                        <input type="radio" className="btn-check me-2" name="features-priority" value="MEDIUM" id="feature-medium"
                            autoComplete="off" />
                        <label className="btn btn-outline-warning me-2" htmlFor="feature-medium">MEDIUM</label>
                        <input type="radio" className="btn-check me-2" name="features-priority" value="LOW" id="feature-low"
                            autoComplete="off" />
                        <label className="btn btn-outline-success me-2" htmlFor="feature-low">LOW</label>
                    </div>
                    <center className="mt-3">
                        <button className="btn btn-secondary" onClick={addFeature}>ADD FEATURE</button>
                    </center>
                </div>
            </div>
            <div className="container border bg-light mt-3 p-2">
                <h5>SELECTED LIST:</h5>
                <div className="row gx-3">
                    <div className="col border m-2 p-1">
                        <h5>BUGS:</h5>
                        <div className="list-group m-3" id="selected_bugs">

                        </div>
                    </div>
                    <div className="col border m-2 p-1">
                        <h5>FEATURES:</h5>
                        <div className="list-group m-3" id="selected_features">

                        </div>
                    </div>
                </div>
            </div>
            <center className="my-5" id="submit_button">
                <button className="btn btn-secondary" onClick={sendData}>SUBMIT LIST</button>
            </center>
        </div>
    )
}
