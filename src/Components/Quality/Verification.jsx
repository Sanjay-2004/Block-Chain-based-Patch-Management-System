import React, { useEffect } from 'react'
import { ABI, Address } from '../Common/Solidity'
import Web3 from 'web3';
import { Web3Storage } from 'web3.storage';
import $ from 'jquery';
import axios from 'axios';

export default function Verification() {

  let account, data;
  useEffect(() => {
    fromDev();
  }, []);
  const client = new Web3Storage({
    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDY3OGUyNDU5OTRFNjM2NjU1ODE0YzZDNTM5OTU2MUMxYjM4MGY0QjUiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2ODc5NDQzMjI4MjQsIm5hbWUiOiJCbG9ja0NoYWluUGF0Y2hNYW5hZ2VtZW50In0.aYtIAHBZgV13SieJ5rY4ol319uT3po6SPvcJfhrNgK0"
  });

  const verified = async (i) => {
    if (window.ethereum !== "undefined") {
      const accounts = await ethereum.request({ method: "eth_requestAccounts" });
      account = accounts[0];
      window.web3 = new Web3(window.ethereum);
      window.contract = await new window.web3.eth.Contract(ABI, Address);
      let pname = data[i].patchName;
      let approved = document.querySelector(`input[name="approval${i}"]:checked`).value;
      let stat;
      if (approved == "ACCEPTED") stat = 1;
      else if (approved == "REJECTED") {
        stat = -1;
        deleteFile(data[i].patch);
      }
      console.log(stat);
      let arr = new Date().toString().split(" ");
      let date_rn = arr[2] + " " + arr[1] + " " + arr[3] + " " + arr[4] + " " + arr[5];
      console.log(date_rn)
      console.log(typeof (stat))
      console.log(pname)
      const result = await window.contract.methods.approval(date_rn, stat, pname).send({ from: account });
      const transactionData = {
        ...result,
        token: localStorage.getItem('token'),
      };
      if (stat == 1)
        transactionData.transactionDone = "Patch Approved"
      else
        transactionData.transactionDone = "Patch Rejected"
      try {
        const url = 'http://localhost:8080/transactions'
        await axios.post(url, transactionData);
        console.log('Transaction saved successfully');
      } catch (error) {
        console.log('Error saving transaction:', error);
      }
      document.getElementById(`deployed${i}`).innerHTML = "SENT SUCCESSFULLY"

    }
  }

  const fromDev = async () => {
    if (window.ethereum !== "undefined") {
      const accounts = await ethereum.request({ method: "eth_requestAccounts" });
      account = accounts[0]
      window.web3 = new Web3(window.ethereum);
      window.contract = await new window.web3.eth.Contract(ABI, Address);
      data = await window.contract.methods.getRequests().call();
      let sno = 1;
      for (let i = data.length - 1; i >= 0; i--) {
        let tbody = ``;
        let temp = data[i];
        const cid = temp.cid;
        const res = await client.get(cid);
        const files = await res.files();
        const file = files[0];
        const url = URL.createObjectURL(file);
        tbody += `<td><center><strong>${sno++}</strong></center></td>
                <td><center><strong>${temp.patchName}</strong></center></td>
                <td><center><button type="button" class="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#desc${i}">
                    PATCH DESCRIPTION
                </button></center></td>
                <td><center>${temp.timeofReport}</center></td>
                <td><center><strong>${temp.vno}</strong></center></td>
                <td><center><button type="button" class="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#data${i}">
                    BUGS & FEATURES
                </button></center></td><td><a href="${url}" download = "${temp.filename}" class="btn btn-secondary">DOWNLOAD</a></td><td>`
        if (temp.approved == 0) {
          tbody += `<div class="btn-group" role="group" aria-label="Basic radio toggle button group">
      <input type="radio" class="btn-check" name="approval${i}" value="ACCEPTED" id="accepted${i}" autocomplete="off" checked>
      <label class="btn btn-outline-success" for="accepted${i}">ACCEPT</label>
      <input type="radio" class="btn-check" name="approval${i}" value="REJECTED" id="rejected${i}" autocomplete="off">
      <label class="btn btn-outline-danger" for="rejected${i}">REJECT</label>
      </div></td><td><center id="deployed${i}"></center></td>`
        }
        else if (temp.approved == -1 && temp.uploaded == 1) {
          tbody += `<div class="btn-group" role="group" aria-label="Basic radio toggle button group">
      <input type="radio" class="btn-check" name="approval${i}" value="ACCEPTED" id="accepted${i}" autocomplete="off" checked>
      <label class="btn btn-outline-success" for="accepted${i}">ACCEPT</label>
      <input type="radio" class="btn-check" name="approval${i}" value="REJECTED" id="rejected${i}" autocomplete="off">
      <label class="btn btn-outline-danger" for="rejected${i}">REJECT</label>
      </div></td><td><center id="deployed${i}"></center></td>`
        }
        else if (temp.approved == -1) {
          tbody += `<center>REJECTED</center></td><td><center id="deployed${i}">SENT FOR RE-UPLOAD</center></td>`
        }
        else {
          tbody += `<center>APPROVED</center><td><center id="deployed${i}">SENT SUCCESSFULLY</center></td>`
        }

        let tr = document.createElement('tr');
        if (data.length != 0) {
          let bodyy = document.getElementById('forcheck');
          tr.id = 'row' + i;
          tr.innerHTML = tbody;
          bodyy.appendChild(tr);
        }

      }
      for (let i = 0; i < data.length; i++) {
        let temp = data[i];
        if ((temp.approved == 0 || temp.approved == -1) && temp.uploaded == 1) {
          let butto = document.createElement('button');
          butto.onclick = () => {
            verified(i);
          }
          if (temp.approved == 0) {
            butto.classList.add('btn', 'btn-secondary');
            butto.innerHTML = `SUBMIT`
          } else if (temp.approved == -1 && temp.uploaded == 1) {
            butto.classList.add('btn', 'btn-danger');
            butto.innerHTML = `RE-SUBMIT`
          }
          let centerTag = document.getElementById(`deployed${i}`);
          centerTag.appendChild(butto);
        }
        let modd = ``
        // modd+=`<div className="modal fade" id="data${i}" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="data${i}Label" aria-hidden="true">`
        modd += `<div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="data${i}Label">Bugs and Features Cleared</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <div class="row mt-3 gx-3">
                                <div class="col">
                                    <div class="list-group" id="bugsof${i}"></div>
                                </div>
                                <div class="col">
                                    <div class="list-group" id="featuresof${i}"></div>
                                </div>
                            </div>`
        modd += `</div>
                    </div>
                </div>`
        let div = document.createElement('div');
        div.setAttribute('class', 'modal fade');
        div.setAttribute('id', `data${i}`);
        div.setAttribute('data-bs-backdrop', 'static');
        div.setAttribute('data-bs-keyboard', 'false');
        div.setAttribute('tabindex', '-1');
        div.setAttribute('aria-labelledby', `data${i}Label`);
        div.setAttribute('aria-hidden', 'true');
        let modalsDiv = document.getElementById('modals');
        div.innerHTML = modd;
        modalsDiv.appendChild(div);
        const bugsDiv = document.getElementById(`bugsof${i}`);
        for (let j in temp.bugRequest) {
          let temp1 = temp.bugRequest[j];
          const li = document.createElement('li');
          li.className = 'list-group-item list-group-item-action';
          li.innerHTML = `
                <div className="d-flex w-100 justify-content-between">
                <h5 className="mb-1">${temp1[0]}</h5>
                </div>
                <p className="mb-1">${temp1[1]}</p>
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
        let dd = temp.patchDescription.split("\n");
        let desc = `<div class="modal-dialog">
            <div class="modal-content">
            <div class="modal-header">
            <h1 class="modal-title fs-5" id="descof${i}">PATCH DESCRIPTION</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">`
        for (let j in dd) {
          desc += `${dd[j]}<br>`
        }
        desc += `</div>
            </div>
            </div>`
        div = document.createElement('div');
        div.setAttribute('class', 'modal fade');
        div.setAttribute('id', `desc${i}`);
        div.setAttribute('data-bs-backdrop', 'static');
        div.setAttribute('data-bs-keyboard', 'false');
        div.setAttribute('tabindex', '-1');
        div.setAttribute('aria-labelledby', `descof${i}`);
        div.setAttribute('aria-hidden', 'true');
        modalsDiv = document.getElementById('modals');
        div.innerHTML = desc;
        modalsDiv.appendChild(div);
      }
      // document.getElementById('modals').innerHTML = modd
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
              <th><center>Patch Name</center></th>
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
          </tbody>
        </table>
      </div>
      <div id="modals"></div>
    </>
  )
}
