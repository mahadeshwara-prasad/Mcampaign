"use client"
import {React, Suspense, useEffect, useState} from "react";
import Login from "./(Components)/Login"
import 'semantic-ui-css/semantic.min.css';
import createFactory from "../ethereum/factory";
import { useRouter } from 'next/navigation';

export default function Page(){
    const [error,setError] = useState("");

    const router = useRouter();
    async function contractInit(){
        try{
            const factory = await createFactory();
            router.push('/campaign');
        }
        catch(err){
            setError(err);
            console.log(err);
        }
        
        //console.log(factory);
        //console.log(det);
    }    
    useEffect(()=>{
        
        //contractInit();
    },[]);



    return (
        <Suspense fallback={<p>Wait it is loading....</p>}>
        
            <Login connectWallet={contractInit}></Login>
            {error? <div className="ui error message">
                        <div className="header">
                            Error occured due to one of the following problems.
                        </div>
                        <ul className="list">
                            <li>MetaMask is not installed: Please install metamask to continue</li>
                            <li>Connection was not established to your metamask wallet</li>
                            <li>Sapholia test network is not selected</li>
                        </ul>
                    </div>:
                    <div></div>}
        </Suspense>
    );
}


