// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract Factory{
    address[] public deployedContract;
    string[] public deployedContractName;

    function createCampaign(string memory name, uint min) public {
        address newCapaign = address(new Campaign(min,msg.sender));
        deployedContract.push(newCapaign);
        deployedContractName.push(name);
    }

    function getDeployedContract() public view returns (address[] memory, string[] memory){
        return (deployedContract,deployedContractName);
    }
}


contract Campaign{

    struct Request{
        string description;
        uint value;
        address recipient;
        bool complete;
        uint approvalCount;
        mapping(address=>bool) approval;
    }
    uint public requestCount;
    address public manager;
    mapping(address=>bool) public approvers;
    uint public approversCount;
    uint public minCont;
    //mapping(uint=>Request) public request;
    Request[] public request;

    constructor(uint min,address creator) {
        manager=creator;
        minCont=min;
    }

    function contribute() public payable {
        require(msg.value>minCont, "Contribution amount should be greater than minimum amount");
        approversCount++;
        approvers[msg.sender]=true;
    }

    function createRequest(string memory description, uint value, address recipient) public restricted {
        Request storage newRequest = request.push();
        newRequest.description = description;
        newRequest.value = value;
        newRequest.recipient = recipient;
        newRequest.complete = false;
        newRequest.approvalCount = 0;
    }

    function approveRequest(uint index) public {
        require(approvers[msg.sender],"You are not a contributer");
        require(request[index].approval[msg.sender]==false, "You have already approved this request");
        request[index].approvalCount++;
        request[index].approval[msg.sender]=true;
    }

    function finilizeRequest(uint index) public restricted{
        require(request[index].complete==false, "Request has already been finalised");
        require(request[index].approvalCount>approversCount/2, "Request has not met numbers of approvers");
        payable (request[index].recipient).transfer(request[index].value);
        request[index].complete = true;
    }

    function getSummary() public view returns (
        uint, uint, uint, uint, address) {
            return (
            minCont,
            address(this).balance,
            request.length,
            approversCount,
            manager
            );
    }    
    function getRequestsCount() public view returns (uint) {
        return request.length;
    }

    modifier restricted{
        require(msg.sender==manager, "Only manager can call this option");
        _;
    }
}