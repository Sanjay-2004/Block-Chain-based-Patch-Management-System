// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.5.0 <0.9.0;

struct bugReport {
    string bugTitle;
    string bugDescription;
    string bugPriority;
}

struct featureReport {
    string featureTitle;
    string featureDescription;
    string featurePriority;
}

struct listOfBnF {
    string timeofReport;
    string patchName;
    string patchDescription;
    string vno;
    bugReport[] bugRequest;
    featureReport[] featureRequest;
    bool deployed;
    int uploaded;
    int approved;
    string filename;
    string cid;
}

struct fromReporter{
    bool admin;
    string time;
    bugReport[] bugsSent;
    featureReport[] featuresSent;
}

contract PatchDevelopment{
    bugReport[] public unselectedBugs;
    featureReport[] public unselectedFeatures;
    mapping (string => fromReporter) public reports;
    string[] times;
    mapping(string => listOfBnF) public requests;
    string[] patchnames;
    address[] public reporters;
    address[] public admins = [0xDDd20723FAA12ca629Fc988dE1a84d47daD150ca];
    address[] public developers;
    address[] public quality;

    // Modifier to check if the caller is in the reporters array
    modifier onlyReporters() {
        bool found = false;
        for (uint256 i = 0; i < reporters.length; i++) {
            if (reporters[i] == msg.sender) {
                found = true;
                break;
            }
        }
        require(found, "Only reporters can access this function");
        _;
    }

    // Modifier to check if the caller is in the admins array
    modifier onlyAdmins() {
        bool found = false;
        for (uint256 i = 0; i < admins.length; i++) {
            if (admins[i] == msg.sender) {
                found = true;
                break;
            }
        }
        require(found, "Only admins can access this function");
        _;
    }

    // Modifier to check if the caller is in the developers array
    modifier onlyDevelopers() {
        bool found = false;
        for (uint256 i = 0; i < developers.length; i++) {
            if (developers[i] == msg.sender) {
                found = true;
                break;
            }
        }
        require(found, "Only developers can access this function");
        _;
    }

    // Modifier to check if the caller is in the quality array
    modifier onlyQuality() {
        bool found = false;
        for (uint256 i = 0; i < quality.length; i++) {
            if (quality[i] == msg.sender) {
                found = true;
                break;
            }
        }
        require(found, "Only quality analysts can access this function");
        _;
    }

    // Used by reporter to submit bugs
    function toAdmin(string memory _time, string[][] memory new_b,string[][] memory new_f) public onlyReporters{
        times.push(_time);
        fromReporter storage temporary = reports[_time];
        temporary.admin=false;
        temporary.time = _time;
        for (uint256 i = 0; i < new_b.length; i++) {
            bugReport memory bugTemp =  bugReport(new_b[i][0], new_b[i][1], new_b[i][2]);
            temporary.bugsSent.push(bugTemp);
        }
        
        for (uint256 i = 0; i < new_f.length; i++) {
            featureReport memory featureTemp = featureReport(new_f[i][0], new_f[i][1], new_f[i][2]);
            temporary.featuresSent.push(featureTemp);
        }
    }

    // Used by Admin to read reports
    function sendList() public view returns(fromReporter[] memory){
        fromReporter[] memory result = new fromReporter[](times.length);
        for (uint256 i = 0; i < times.length; i++) { 
                result[i] = reports[times[i]];
        }
        return result;
    }

    function previousReq() public view returns(bugReport[] memory, featureReport[] memory ){
        return (unselectedBugs,unselectedFeatures);
    }

    // Used by admin to submit list
    function unChecked(string[][] memory new_b,string[][] memory new_f) internal onlyAdmins{
        delete unselectedBugs;
        for(uint256 i=0;i<new_b.length;i++){
            bugReport memory temp = bugReport(new_b[i][0], new_b[i][1], new_b[i][2]);
            unselectedBugs.push(temp);
        }
        delete unselectedFeatures;  
        for(uint256 i=0;i<new_f.length;i++){
            featureReport memory temp = featureReport(new_f[i][0], new_f[i][1], new_f[i][2]);
            unselectedFeatures.push(temp);
        }
    }

    // Admin uses this to submit to developer
    function fromAdmin(string memory time_rn, string[] memory time_dev, string memory pname, string memory pdesc,
     string[][] memory bugs, string[][] memory features, string[][] memory bugsUn, string[][] memory featuresUn) public onlyAdmins {
        
        unChecked(bugsUn, featuresUn);
        for(uint256 i=0;i<time_dev.length;i++){

        reports[time_dev[i]].admin = true;
        }
        listOfBnF storage temporary = requests[pname];
        patchnames.push(pname);
        temporary.patchName = pname;
        temporary.patchDescription = pdesc;
        temporary.approved = 0;
        temporary.deployed = false;
        temporary.uploaded = 0;
        temporary.timeofReport = time_rn;

        for (uint256 i = 0; i < bugs.length; i++) {
            bugReport memory bugTemp =  bugReport(bugs[i][0], bugs[i][1], bugs[i][2]);
            temporary.bugRequest.push(bugTemp);
        }
        
        for (uint256 i = 0; i < features.length; i++) {
            featureReport memory featureTemp = featureReport(features[i][0], features[i][1], features[i][2]);
            temporary.featureRequest.push(featureTemp);
        }
    }

    // Admin uses this when registering a new Employee
    function newEmployee(string memory role, address accountAddress) public onlyAdmins {
        if (keccak256(abi.encodePacked(role)) == keccak256(abi.encodePacked("Reporter"))) {
            reporters.push(accountAddress);
        } else if (keccak256(abi.encodePacked(role)) == keccak256(abi.encodePacked("Admin"))) {
            admins.push(accountAddress);
        } else if (keccak256(abi.encodePacked(role)) == keccak256(abi.encodePacked("Developer"))) {
            developers.push(accountAddress);
        } else if (keccak256(abi.encodePacked(role)) == keccak256(abi.encodePacked("Quality Analyst"))) {
            quality.push(accountAddress);
        }
    }


    // Developer uses this function to see what came from admin
    function getRequests() public view returns (listOfBnF[] memory) {
        listOfBnF[] memory result = new listOfBnF[](patchnames.length);

        for (uint256 i = 0; i < patchnames.length; i++) {   
            result[i] = requests[patchnames[i]];
        }

        return result;
    }

    // Used by Developer to submit the patch
    // Used by QA to see the patches uploaded by Developer
    // Also used by the Admin before deployment
    function uploadedbyDev(string memory time_rn, string memory pname, string memory ver, 
    string memory fileName, string memory _cid) public onlyDevelopers{
        listOfBnF storage temp = requests[pname];
        temp.timeofReport = time_rn;
        temp.vno = ver;
        temp.filename = fileName;
        temp.cid = _cid;
        temp.uploaded = 1;
    }


    // Approval given by QA
    function approval(string memory time_rn, int status, string memory pname) public onlyQuality{
        listOfBnF storage temp1 = requests[pname];
        temp1.approved = status;
        temp1.uploaded = status;
        temp1.timeofReport = time_rn;
    }
    
    // used by admin for deployment 
    function deployment(string memory time_rn, string memory pname, bool status) public onlyAdmins{
        listOfBnF storage temp = requests[pname];
        temp.deployed = status;
        temp.timeofReport = time_rn;

    }

    // Used by the User to get the patches
    function newPatches() public view returns(listOfBnF[] memory){
        listOfBnF[] memory result = new listOfBnF[](patchnames.length);
        uint256 j=0;
        for (uint256 i = 0; i < patchnames.length; i++) { 
            if(requests[patchnames[i]].deployed){
            result[j] = requests[patchnames[i]];
            j++;
            }
        }

        return result;
    }
}