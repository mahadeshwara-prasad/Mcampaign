"use client"
import {React, Suspense, useState} from "react";
import 'semantic-ui-css/semantic.min.css';
import createFactory from "../../../../ethereum/factory";
import { useRouter } from 'next/navigation';
import { parseEther } from "ethers";

export default function Form(){

    const [name,setName] = useState("");
    const [min,setMin] = useState("");
    const [error,setError] = useState("");
    const [state,setState] = useState("");
    const router = useRouter();
    const [message,setMessage] = useState("");
    const [mtype,setMtype] = useState("");
    
    async function handleSubmit(event){
        event.preventDefault();
        setMessage("");
        setState("loading");
        try{
            const factory = await createFactory();
            const create = await factory.createCampaign(name,parseEther(min));
            const recipt = await create.wait();
            setMtype("green");
            setMessage("Your Campaign Created Successfully");
            router.push('/campaign');
            setState("");
        }catch(err){
            setMtype("red");
            setMessage(<div>
                        <div className="header">
                            One of the following error has occured while submitting the transaction.
                        </div>
                        <ul>
                            <li>User Denied Transaction.</li>
                            <li>Incorrect input type.</li>
                            <li>Wallet is not connect</li>
                            <li>Invalid Campaign address</li>
                        </ul>
                    </div>);
            setState("");
        }
        
    }

    return(
        <Suspense fallback={<p>wait till the form loads</p>}>
        
        <form className="ui form" onSubmit={handleSubmit}>
            <div className="field">
                <label>Name of the Campaign</label>
                <input onChange={(event)=>{setName(event.target.value)}} type="text" name="first-name" placeholder="Campaign Name" value={name}/>
            </div>
            <div className="field">
                <label>Minimum Contribution</label>
                <div className="ui action input">
                    <input onChange={(event)=>{setMin(event.target.value)}} type="text" name="last-name" placeholder="Minimum Contribution" value={min}/>
                    <button className="ui button">Ethers</button>
                </div>
            </div>
            <button className={`ui green ${state} button`} type="submit">Submit</button>
        </form>
        {message ? <div className={`ui ${mtype} message`}>{message}</div> : <div></div>}
        </Suspense>
    );
}