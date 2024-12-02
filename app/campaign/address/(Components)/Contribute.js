"use client"
import React, {Suspense, useEffect, useState } from "react";
import campaign from "../../../../ethereum/campaign";
import 'semantic-ui-css/semantic.min.css';
import { formatEther , parseEther } from "ethers";

export default function Contribute({setsummary,summary,address}){

    const [value,setValue] = useState("");
    const [state,setState] = useState("");
    const [message,setMessage] = useState("");
    const [mtype,setMtype] = useState("");

    async function handleClick(){
        setState("loading");
        setMessage("");
        
        try{
            if(parseFloat(formatEther(summary[0]))<=parseFloat(value)){
                const newCampaign = await campaign(address);
                const contribute = await newCampaign.contribute({value: parseEther(value)});
                const recipt = await contribute.wait();
                setState("");
                const getSummary = await newCampaign.getSummary();
                setsummary(getSummary);
                setMtype("green");
                setMessage("Your are now a Contributor");
            }
            else{
                setMtype("red");
                setMessage("Contribution amount should be greater then minimum contribution.");
                setState("");
            }
            
        }catch(err){
            console.log(err);
            setMtype("red");
            setMessage(<div>
                        <div className="header">
                            One of the following error has occured while submitting the transaction.
                        </div>
                        <ul>
                            <li>User Denied Transaction.</li>
                            <li>Incorrect input type.</li>
                            <li>Wallet is not connect</li>
                        </ul>
                    </div>);
            setState("");
        }
        
    }

    return(
        <Suspense>
            <div className="ui pointing below green label">
                Contribute
            </div>
            <div className="ui action input" style={{paddingBottom: "20px"}}>
                <input type="text" placeholder="Enter your amount" onChange={(event)=>{setValue(event.target.value)}} value={value}/>
                <button className="ui button">Ethers</button>
            </div>
            <button className={`ui green ${state} button`} onClick={handleClick}>Contribute</button>
            {message ? <div className={`ui ${mtype} message`}>{message}</div> : <div></div>}
        </Suspense>
    );
}