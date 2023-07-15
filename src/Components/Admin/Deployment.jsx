import React, { useEffect, useState } from 'react'
import { ABI, Address } from '../Common/Solidity'
import Web3 from 'web3';
import { Web3Storage } from 'web3.storage';
import $ from 'jquery';
import axios from 'axios';


export default function Deployment() {

    let account;
    const [data, setData] = useState([]);
    useEffect(() => {
        deploy();
    }, []);
    const client = new Web3Storage({
        token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDY3OGUyNDU5OTRFNjM2NjU1ODE0YzZDNTM5OTU2MUMxYjM4MGY0QjUiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2ODkzMTcyODczNTAsIm5hbWUiOiJDaGVja2luZyJ9.DJFrxfYvpgp364lOhMCV9CZj6P8zPxE6n3z_NAooIKs"
    });

    const deploynow = async (i) => {
        if (window.ethereum !== "undefined") {
            const accounts = await ethereum.request({ method: "eth_requestAccounts" });
            account = accounts[0]
            const token = localStorage.getItem('token');
            const decodedToken = token ? jwt_decode(token) : null;
            const address = decodedToken ? decodedToken.address : null;
            window.web3 = new Web3(window.ethereum);
            window.contract = await new window.web3.eth.Contract(ABI, Address);
            let pname = data[i].patchName
            let arr = new Date().toString().split(" ");
            let date_rn = arr[2] + " " + arr[1] + " " + arr[3] + " " + arr[4] + " " + arr[5];
            let k = true;
            const result = await window.contract.methods.deployment(date_rn, pname, k).send({ from: address });
            const transactionData = {
                ...result,
                token: localStorage.getItem('token'),
                transactionDone: "Latest Patch Deployed"
            };

            try {
                const url = `${import.meta.env.VITE_BASE_URL}/transactions`
                await axios.post(url, transactionData);
                console.log('Transaction saved successfully');
            } catch (error) {
                console.log('Error saving transaction:', error);
            }
            document.getElementById(`deployed${i}`).innerHTML = `DEPLOYED`
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

    const deploy = async () => {
        if (window.ethereum !== "undefined") {
            const accounts = await ethereum.request({ method: "eth_requestAccounts" });
            account = accounts[0]
            window.web3 = new Web3(window.ethereum);
            window.contract = await new window.web3.eth.Contract(ABI, Address);
            const fetchedData = await window.contract.methods.getRequests().call();
            const reversedData = [...fetchedData].reverse();
            setData(reversedData);
            $(function () {
                $('#example').DataTable();
            });
        }
    }

    return (
        <>
            <div className="container my-3 bg-light p-3" id="deployment">
                <table id="example" className="table table-striped">
                    <thead>
                        <tr>
                            <th><center>Serial Number</center></th>
                            <th><center>Patch Description</center></th>
                            <th><center>Version Number</center></th>
                            <th><center>Time of Approval/Deployment</center></th>
                            <th><center>Bugs and Features Cleared</center></th>
                            <th><center>Download</center></th>
                            <th><center>Deployment Status</center></th>
                        </tr>
                    </thead>
                    <tbody id="fordeploy">
                        {data.map((temp, i) => {
                            console.log(temp)
                            return (
                                <tr id={`row${i}`} key={i}>
                                    <td><center><strong>{i + 1}</strong></center></td>
                                    <td><center><button type="button" className="btn btn-secondary" data-bs-toggle="modal" data-bs-target={`#desc${i}`}>{temp.patchName}</button></center></td>
                                    <td>
                                        {temp.vno.length > 0 && (<center><strong>{temp.vno}</strong></center>)}
                                        {temp.vno.length <= 0 && (<center>NOT UPLOADED</center>)}
                                    </td>
                                    <td><center>{temp.timeofReport}</center></td>
                                    <td><center><button type="button" className="btn btn-secondary" data-bs-toggle="modal" data-bs-target={`#data${i}`}>BUGS & FEATURES</button></center></td>
                                    <td>
                                        {temp.approved == 1 && (<button onClick={() => { getUrl(temp) }} className="btn btn-secondary">DOWNLOAD</button>)}
                                        {temp.approved != 1 && (<center>PENDING</center>)}
                                    </td>
                                    <td>
                                        {temp.deployed && temp.approved == 1 && (<center id={`deployed${i}`}>DEPLOYED</center>)}
                                        {!temp.deployed && temp.approved == 1 && (<center id={`deployed${i}`}><button className='btn btn-secondary' onClick={() => { deploynow(i) }}>DEPLOY</button></center>)}
                                        {temp.approved != 1 && (<center>N/A</center>)}

                                    </td>
                                </tr>
                            )
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