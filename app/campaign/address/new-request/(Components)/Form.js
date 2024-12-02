import React, { Suspense, useState } from "react";
import campaign from "../../../../../ethereum/campaign";
import { parseEther } from "ethers";
import { useRouter } from 'next/navigation';

export default function Form({address}){

    const [value,setValue] = useState("");
    const [recipient,setRecipient] = useState("");  
    const [description,setDescription] = useState(""); 
    const [state,setState] = useState("");
    const [message,setMessage] = useState("");
    const [mtype,setMtype] = useState("");
    const router = useRouter();

    async function handleSubmit(event){
        event.preventDefault();
        setState("loading");
        setMessage("");
        try{
            const newCampaign = await campaign(address);
            const newRequest = await newCampaign.createRequest(description,parseEther(value),recipient);
            const recipt = await newRequest.wait();
            setState("");
            setMtype("green");
            setMessage("Request successfully submitted");
            router.push(`/campaign/address/requests?address=${address}`);
        }catch(err){
            console.log(err);
            setMtype("red");
            setMessage(<div>
                        <div className="header">
                            One of the following error has occured while submitting the transaction.
                        </div>
                        <ul>
                            <li>Only this campaign owner can create new request</li>
                            <li>Invalid Campaign address</li>
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
            <form onSubmit={handleSubmit}>
                <div className="ui form" style={{paddingBottom: "20px",paddingTop: "20px"}}>
                    <div className="three fields">
                        <div className="eight wide field">
                        <label>Amount</label>
                        <div className="ui action input">
                            <input type="text" placeholder="Amount" onChange={(event)=>{setValue(event.target.value)}} value={value}/>
                            <button className="ui button">Ethers</button>
                        </div>
                        </div>
                        <div className="eight wide field">
                        <label>Recipient</label>
                        <input type="text" placeholder="Recipient address" onChange={(event)=>{setRecipient(event.target.value)}} value={recipient}/>
                        </div>
                    </div>
                    <div className="field">
                        <label>Description</label>
                        <textarea rows="2" placeholder="More details about the payment" onChange={(event)=>{setDescription(event.target.value)}} value={description}></textarea>
                    </div>
                </div>
                <button className={`ui green ${state} basic button`} type="submit">Submit</button>
            </form>
            {message ? <div className={`ui ${mtype} message`}>{message}</div> : <div></div>}
        </Suspense>
    );
}