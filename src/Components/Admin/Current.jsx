import React, { useEffect } from 'react'
import { ABI, Address } from '../Common/Solidity'
import Web3 from 'web3';
import '../Styles.css'
import $ from 'jquery';
import axios from 'axios';
import jwt_decode from 'jwt-decode';


export default function Current() {

  let timeOfDev = [];
  let account, data;

  useEffect(() => {
    showData();
  }, []);

  const showData = async () => {
    if (window.ethereum !== "undefined") {
      const accounts = await ethereum.request({ method: "eth_requestAccounts" });
      account = accounts[0]

      window.web3 = new Web3(window.ethereum);
      window.contract = await new window.web3.eth.Contract(ABI, Address);
      data = await window.contract.methods.sendList().call();
      console.log(data)
      const currentBugsDiv = document.getElementById('currentBugs');
      const currentFeaturesDiv = document.getElementById('currentFeatures');
      for (let i in data) {
        let temp = data[i];
        timeOfDev.push(temp.time);
        if (!temp.admin && temp.time != '') {
          document.getElementById('nonefornow').innerHTML = ''
          for (let j in temp.bugsSent) {
            let bugCur = temp.bugsSent[j];
            const li = document.createElement('li');
            li.className = 'list-group-item list-group-item-action';
            li.innerHTML = `
              <div class="d-flex w-100 justify-content-between">
                <h5 class="mb-1">${bugCur.bugTitle}</h5>
                  <div class="form-check form-switch">
                    <input class="form-check-input" type="checkbox" role="switch" name="bugs_dev" value="${bugCur.bugTitle},${bugCur.bugDescription},${bugCur.bugPriority}" id="bugs_in_this_patch">
                  </div>
              </div>
              <p class="mb-1">${bugCur.bugDescription}</p>
              <small>PRIORITY: ${bugCur.bugPriority}</small>`;
            currentBugsDiv.appendChild(li);
          }
          for (let j in temp.featuresSent) {
            let featureCur = temp.featuresSent[j];
            const li = document.createElement('li');
            li.className = 'list-group-item list-group-item-action';
            li.innerHTML = `
              <div class="d-flex w-100 justify-content-between">
                <h5 class="mb-1">${featureCur.featureTitle}</h5>
                  <div class="form-check form-switch">
                    <input class="form-check-input" type="checkbox" role="switch" name="features_dev" value="${featureCur.featureTitle},${featureCur.featureDescription},${featureCur.featurePriority}" id="bugs_in_this_patch">
                  </div>
              </div>
              <p class="mb-1">${featureCur.featureDescription}</p>
              <small>PRIORITY: ${featureCur.featurePriority}</small>`;
            currentFeaturesDiv.appendChild(li);
          }
        }
      }
      const ignored = await window.contract.methods.previousReq().call();
      let ignoredBugs = ignored[0];
      let ignoredFeatures = ignored[1];
      if (ignoredBugs.length != 0) {
        document.getElementById('nonefornow').innerHTML = ''
        for (let i in ignoredBugs) {
          let temp = ignoredBugs[i];
          const li = document.createElement('li');
          li.className = 'list-group-item list-group-item-action';
          li.innerHTML = `
          <div class="d-flex w-100 justify-content-between">
            <h5 class="mb-1">${temp[0]}</h5>
            <div class="form-check form-switch">
              <input class="form-check-input" type="checkbox" role="switch" name="bugs_dev" value="${temp[0]},${temp[1]},${temp[2]}" id="bugs_in_this_patch">
            </div>
          </div>
          <p class="mb-1">${temp[1]}</p>
          <small>${temp[2]}</small>`
          currentBugsDiv.appendChild(li);
        }
      }
      if (ignoredFeatures.length != 0) {
        document.getElementById('nonefornow').innerHTML = ''
        for (let i in ignoredFeatures) {
          let temp = ignoredFeatures[i];
          const li = document.createElement('li');
          li.className = 'list-group-item list-group-item-action';
          li.innerHTML = `
          <div class="d-flex w-100 justify-content-between">
            <h5 class="mb-1">${temp[0]}</h5>
            <div class="form-check form-switch">
              <input class="form-check-input" type="checkbox" role="switch" name="features_dev" value="${temp[0]},${temp[1]},${temp[2]}" id="featuress_in_this_patch">
            </div>
          </div>
          <p class="mb-1">${temp[1]}</p>
          <small>${temp[2]}</small>`
          currentFeaturesDiv.appendChild(li);
        }
      }
    }
  }

  const sendtoDev = async () => {
    if (window.ethereum !== "undefined") {
      let accounts = await ethereum.request({ method: "eth_requestAccounts" });
      account = accounts[0]
      const token = localStorage.getItem('token');
      const decodedToken = token ? jwt_decode(token) : null;
      const address = decodedToken ? decodedToken.address : null;
      window.web3 = new Web3(window.ethereum);
      window.contract = await new window.web3.eth.Contract(ABI, Address);
      let arrayb = [];
      $("input:checkbox[name=bugs_dev]:checked").each(function () {
        let temp = $(this).val()
        let b_arr = temp.split(",");
        arrayb.push(b_arr);
      });
      let arrayf = [];
      $("input:checkbox[name=features_dev]:checked").each(function () {
        let temp = $(this).val()
        let f_arr = temp.split(",");
        arrayf.push(f_arr);
      });
      let arr = new Date().toString().split(" ");
      let date_rn = arr[2] + " " + arr[1] + " " + arr[3] + " " + arr[4] + " " + arr[5];
      let pname = document.getElementById('floatingInput').value;
      let pdesc = document.getElementById('patch-description').value;
      // unchecked();
      let arraybUn = [];
      $("input:checkbox[name=bugs_dev]:not(:checked)").each(function () {
        let temp = $(this).val()
        let b_arr = temp.split(",");
        arraybUn.push(b_arr);
      });
      let arrayfUn = [];
      $("input:checkbox[name=features_dev]:not(:checked)").each(function () {
        let temp = $(this).val()
        let f_arr = temp.split(",");
        arrayfUn.push(f_arr);
      });
      console.log("Bugs: ", arrayb);
      console.log("Features: ", arrayf);
      const result = await window.contract.methods.fromAdmin(date_rn, timeOfDev, pname, pdesc, arrayb, arrayf, arraybUn, arrayfUn).send({ from: address });
      const transactionData = {
        ...result,
        token: localStorage.getItem('token'),
        transactionDone: "New Patch Requested"
      };

      try {
        const url = `${import.meta.env.VITE_BASE_URL}/transactions`
        await axios.post(url, transactionData);
        console.log(result)
        console.log('Transaction saved successfully');
      } catch (error) {
        console.log('Error saving transaction:', error);
      }
      document.getElementById("sent_req").innerHTML = "SENT SUCCESSFULLY"
    }
  }

  return (
    <>
      <div className="container px-5  mt-3 border bg-light">
        <h5 className="mt-4">BUGS AND FEATURES:</h5>
        <div className=" my-3" id="finallist">
          <div className="row gx-3">
            <div className="col">
              <div className="list-group" id="currentBugs">

              </div>
            </div>
            <div className="col">
              <div className="list-group" id="currentFeatures">

              </div>
            </div>
          </div>
          <center id="nonefornow">
            <h6>NONE</h6>
          </center>
        </div>
      </div>
      <div className="container text-center mt-3" id="sent_req">
        <div className="form-floating mb-3">
          <input type="text" className="form-control" id="floatingInput" placeholder="PATCH NAME" required />
          <label htmlFor="floatingInput">PATCH NAME</label>
        </div>
        <div className="form-floating mb-3">
          <textarea className="descript form-control" placeholder="PATCH DESCRIPTION"
            id="patch-description"></textarea>
          <label htmlFor="patch-description">PATCH DESCRIPTION</label>
        </div>
        <div className="mb-5" id="adminacc">
          <button className="btn btn-secondary" onClick={sendtoDev}>REQUEST PATCH</button>
        </div>
      </div>
    </>
  )
}