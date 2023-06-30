import React, { useEffect } from 'react';
import { ABI, Address } from '../Solidity';
import Web3 from 'web3';
import $ from 'jquery';
import { Web3Storage } from 'web3.storage';

export default function Update() {
  let account;
  let data = [];
  let dat;

  useEffect(() => {
    updates();
  }, []);

  //   const initialiseDataTable = () => {
  //     if (!$.fn.DataTable.isDataTable('#example')) {

  //     }
  //   };

  const updates = async () => {
    if (window.ethereum !== 'undefined') {
      const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
      account = accounts[0];
      window.web3 = await new Web3(window.ethereum);
      window.contract = await new window.web3.eth.Contract(ABI, Address);
      dat = await window.contract.methods.getfromDev().call();

      for (let i = dat.length - 1; i >= 0; i--) {
        let temp = dat[i];
        if (temp.deployed == true) {
          data.push(temp);
        }
      }



      for (let i = data.length - 1; i >= 0; i--) {
        let tbody = ``;
        let temp = data[i];
        const client = new Web3Storage({
          token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDY3OGUyNDU5OTRFNjM2NjU1ODE0YzZDNTM5OTU2MUMxYjM4MGY0QjUiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2ODc5NDQzMjI4MjQsIm5hbWUiOiJCbG9ja0NoYWluUGF0Y2hNYW5hZ2VtZW50In0.aYtIAHBZgV13SieJ5rY4ol319uT3po6SPvcJfhrNgK0",
        });
        const cid = temp.cid;
        const res = await client.get(cid);
        const files = await res.files();
        const file = files[0];
        const url = URL.createObjectURL(file);
        tbody += `
            <td><center><strong>${temp.patchName}</strong></center></td>
            <td><center><strong>${temp.vno}</strong></center></td>
            <td><center>${temp.timeofReport}</center></td>
            <td><center><button type="button" class="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#desc${i}">
            WHAT'S NEW
            </button></center></td>
            <td><a href="${url}" download="${temp.filename}" class="btn btn-secondary">DOWNLOAD</a></td>`;

        let tr = document.createElement('tr');
        let bodyy = document.getElementById('released');
        tr.id = 'row' + i;
        tr.innerHTML = tbody;
        bodyy.appendChild(tr);
      }
      for (let i = 0; i < data.length; i++) {
        let temp = data[i]
        let modd = ``;
        let dd = temp.patchDescription.split('\n');
        modd += `<div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <h1 class="modal-title fs-5" id="descof${i}">WHAT'S NEW</h1>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">`
        for (let j in dd) {
          modd += `${dd[j]}<br>`
        }
        modd += `</div>
                      </div>
                    </div>`
        let div = document.createElement('div');
        div.setAttribute('class', 'modal fade');
        div.setAttribute('id', `desc${i}`);
        div.setAttribute('tabindex', '-1');
        div.setAttribute('aria-labelledby', `descof${i}`);
        div.setAttribute('aria-hidden', 'true');
        let modalsDiv = document.getElementById('modals');
        div.innerHTML = modd;
        modalsDiv.appendChild(div);
      }
    }
    // initialiseDataTable();
    $('#example').DataTable({
      order: [[2, 'desc']],
    });
  }

  return (
    <div>
      <div className="container my-3 bg-light p-3" id="deployment">
        <table id="example" className="table table-striped" >
          <thead>
            <tr>
              <th><center>Patch Name</center></th>
              <th><center>Version Number</center></th>
              <th><center>Time of Deployment</center></th>
              <th><center>Bugs and Features Cleared</center></th>
              <th><center>Download</center></th>
            </tr>
          </thead>
          <tbody id="released">

          </tbody>
        </table>
      </div>
      <div id="modals"></div>
    </div>
  )
}
