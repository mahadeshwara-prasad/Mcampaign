"use client"
import React, { Suspense, useEffect, useState } from "react";
import campaign from "../../../../ethereum/campaign";
import Table from "./(Components)/Table";
import Contribute from "../(Components)/Contribute";
import { useRouter } from 'next/navigation';

export const dynamic = "force-dynamic";

export default function Page({searchParams}){

    const [request,setRequest] = useState([]);
    const [rCount,setRcount]=useState("");
    const [aCount,setAcount]=useState("");
    const [summary,setSummary]=useState({});
    const [error,setError] = useState("");
    const router = useRouter();

    useEffect(()=>{
        async function requestDetails(){
            try{
                const newCampaign = await campaign(searchParams.address);
                const requestCount = await newCampaign.getRequestsCount();
                setRcount(requestCount);
                const approversCount = await newCampaign.approversCount();
                setAcount(approversCount);
                const getSum = await newCampaign.getSummary();
                setSummary(getSum);
                const getRequests = await Promise.all(
                    Array(parseInt(requestCount))
                    .fill()
                    .map((element, index) => {
                        return newCampaign.request(index);
                    })
                );
                setRequest(getRequests);
                console.log(getRequests);
            }catch(err){
                setError(err);
                console.log(err);
            }
            
        } 
        requestDetails();
        //sendDetails();
    },[]);

    function sendDetails(){
        const req=request.map((value,index)=>{
            return({
                index: index,
                description: value[0],
                amount: value[1],
                recipient: value[2],
                completed: value[3],
                approval: value[4],
                approvers: aCount
            });
        });
        
        const det = req.map((value,index)=>{
            return(
                <Table key={index} request={value} setrequest={setRequest} address={searchParams.address}></Table>
            );
        });
        return det;
    }

    return(
        <Suspense>
            <h1 style={{paddingBottom:"20px"}}>Requests</h1>
            {error? 
            <div className="ui error message">
                <div className="header">
                    Error occured due to one of the following problems.
                </div>
                <ul className="list">
                    <li>MetaMask is not installed: Please install metamask to continue</li>
                    <li>Invalid Campaign address</li>
                    <li>Connection was not established to your metamask wallet</li>
                    <li>Sapholia test network is not selected</li>
                </ul>
            </div>:
            <div>
            <div className="ui grid" style={{paddingBottom:"20px"}}>
            <div className="twelve wide column">
                <table className="ui fixed celled table">
                    <thead style={{textAlign: "center"}}>
                        <tr>
                            <th>Sl No.</th>
                            <th>Description</th>
                            <th>Amount</th>
                            <th>Recipient</th>
                            <th>Approved</th>
                            <th>Approve</th>
                            <th>Finalize</th>
                        </tr>
                    </thead>
                    <tbody >
                        {sendDetails()}
                    </tbody>
                </table>
            </div>
            <div className="four wide column">
                <Contribute setsummary={setSummary} summary={summary} address={searchParams.address}></Contribute>
            </div>
        </div> 

        <button className="large ui teal button" onClick={()=>{router.push(`/campaign/address/new-request?address=${searchParams.address}`)}}>
            Create New Request
        </button> 
        </div>    
        }
              
            
            
        </Suspense>
    );
}