"use client"
import React, { Suspense, useEffect, useState } from "react";
import campaign from "../../../ethereum/campaign";
import Card from "./(Components)/Card";
import 'semantic-ui-css/semantic.min.css';
import Contribute from "./(Components)/Contribute";
import { useRouter } from 'next/navigation';

export default function Page({ params }){
    const [summary,setSummary] = useState({});
    const [error,setError] = useState("");
    const router = useRouter();

    useEffect(()=>{
       async function createCampaign(){
            try{
                const newCampaign = await campaign(params.address);
                const getSummary = await newCampaign.getSummary();
                setSummary(getSummary);
                console.log(getSummary);
            }catch(err){
                setError(err);
                console.log(err);
            }
      
        }
        createCampaign();
    },[]);

    return (
    <Suspense>
        <h2 style={{paddingBottom:"30px"}}>Campaign: {params.address}</h2>
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
                    <Card details={summary}></Card>
                    
                </div>
                <div className="four wide column">
                    <Contribute setsummary = {setSummary} summary={summary} address={params.address}></Contribute>
                </div>
            </div>
            <button className="large ui teal button" onClick={()=>{router.push(`/campaign/${params.address}/requests`)}}>
                    View Requests
            </button>
        </div>}
        
    </Suspense>
        
    );
}