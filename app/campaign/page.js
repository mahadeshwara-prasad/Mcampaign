"use client"
import {React, Suspense, useEffect, useState} from "react";
import Card from "./(Components)/Card";
import createFactory from "../../ethereum/factory";
import Link from 'next/link'

export default function Page(){
        const [address,setAddress] = useState({});
        const [name,setName] = useState({});
        const [error,setError] = useState("");
        useEffect(()=>{
            async function getDetails(){
                try{
                    const factory = await createFactory();
                    const [getAddress,getName] = await factory.getDeployedContract();
                    setAddress(getAddress);
                    setName(getName);
                    // console.log(address);
                    // console.log(name);
                }catch(err){
                    setError(err);
                    console.log(err);
                }
                
            }
            getDetails();
        },[])

        function putDetails(){
            const addr = Array.from(address);
            const item = addr.map((value, index)=>{
                return({
                    keyAddress: value,
                    keyName: name[index],
                    description: (
                        <Link href={`/campaign/${value}`}>view campaign</Link>
                    )
                });
                
            });
            const det = item.map((value,index)=>{
                return(<Card key={index} info={value}></Card>);
            })
            return det;
        }

        return (
           
            <Suspense fallback={<p>Wait till it loads</p>}>
                <h1 style={{paddingBottom: "20px"}}>Public Campaign</h1>
                {error? 
                <div className="ui error message">
                    <div className="header">
                        Error occured due to one of the following problems.
                    </div>
                    <ul className="list">
                        <li>MetaMask is not installed: Please install metamask to continue</li>
                        <li>Connection was not established to your metamask wallet</li>
                        <li>Sapholia test network is not selected</li>
                    </ul>
                </div>:
                <div className="ui grid" >
                    
                    <div className="thirteen wide column">
                    {
                        putDetails()
                    }
                    </div>
                    <div className="three wide column">
                        <Link href="/campaign/new">
                        <button className="ui fluid right floated blue button">
                            <i className="plus circle icon"></i>
                            Add Campaign
                        </button>
                        </Link>
                    </div>
                </div>}
                
            </Suspense>
           
        )
    
}