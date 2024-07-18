"use client"
import { formatEther} from "ethers";
import React, {Suspense, useState} from "react"
import campaign from "../../../../../ethereum/campaign";
import swal from 'sweetalert';

export default function Table({request,setrequest,address}){
    const [astate,setaState] = useState("");
    const [fstate,setfState] = useState("");
    const [message,setMessage] = useState("");
    const [mtype,setMtype] = useState("");

    async function handleApprove(){
        setaState("loading");
        try{
            const newCampaign = await campaign(address);
            const requestCount = await newCampaign.getRequestsCount();
            const approve = await newCampaign.approveRequest(request.index);
            const reciept = await approve.wait();
            setaState("");
            const getRequests = await Promise.all(
                Array(parseInt(requestCount))
                  .fill()
                  .map((element, index) => {
                    return newCampaign.request(index);
                  })
            );
            setrequest(getRequests);
            swal("Success", "Request Approved", "success", {
                buttons: false,
                timer: 4000,
            });
        }catch(err){
            setaState("");
            console.log(err);
            swal("One of the following error has occured while Approving request.", 
            "1) Your have already approved this request\n2) You are not a Contributor for this campaign\n3) You denied the transaction\n4) Metamask wallet is not connected", 
            "error", {
                buttons: false,
            });  
        }
    }

    async function handleFinalize(){
        setfState("loading");
        try{
            const newCampaign = await campaign(address);
            const requestCount = await newCampaign.getRequestsCount();
            const finalize = await newCampaign.finilizeRequest(request.index);
            const reciept = await finalize.wait();
            setfState("");
            const getRequests = await Promise.all(
                Array(parseInt(requestCount))
                  .fill()
                  .map((element, index) => {
                    return newCampaign.request(index);
                  })
            );
            setrequest(getRequests);
            swal("Success", "Request Finalized", "success", {
                buttons: false,
                timer: 4000,
            });
        }catch(err){
            setfState("");
            console.log(err);
            swal("One of the following error has occured while Finalizing request.", 
            "1) Only Campaign owner can finalize the request\n2) Minimum number of approvals has not reached\n3) You denied the transaction\n4) Metamask wallet is not connected", 
            "error", {
                buttons: false,
            }); 
        }
    }

    return(
        <Suspense>
                {request.completed ? 
                <tr className="disabled" style={{textAlign: "center"}}>
                    <td>{(request.index)+1}</td>
                    <td>{request.description}</td>
                    <td>{request? formatEther(request.amount):parseFloat(request.amount)}</td>
                    <td style={{overflowWrap: "break-word"}}>{request.recipient}</td>
                    <td>{parseInt(request.approval)}/{parseInt(request.approvers)}</td>
                    <td><button className="ui disabled green button" onClick={handleApprove}>Approv</button></td>
                    <td><button className="ui disabled blue button">Finalize</button></td>
                </tr>
                : <tr style={{textAlign: "center"}}>
                <td>{(request.index)+1}</td>
                <td>{request.description}</td>
                <td>{request? formatEther(request.amount):parseFloat(request.amount)}</td>
                <td style={{overflowWrap: "break-word"}}>{request.recipient}</td>
                <td>{parseInt(request.approval)}/{parseInt(request.approvers)}</td>
                <td><button className={`ui green ${astate} button`} onClick={handleApprove} style={{paddingRight:"25px",paddingLeft:"25px"}}>Approve</button></td>
                <td><button className={`ui blue ${fstate} button`} onClick={handleFinalize}>Finalize</button></td>
            </tr>} 
            
            </Suspense>  
            
    );
}