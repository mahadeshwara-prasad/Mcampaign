"use client"
import { useEffect, useState } from "react";
import React from "react";
import 'semantic-ui-css/semantic.min.css';
import ethers, { formatEther } from "ethers";

export default function Card({details}){

    return(
        <div className="ui cards">
            <div className="card">
                <div className="content">
                <div className="header" style={{overflowWrap: "break-word"}}>{details[4]}</div>
                <div className="description">
                    Campaign Owned By
                </div>
                </div>
            </div>
            <div className="card">
                <div className="content">
                { details[0] ? <div className="header">{formatEther(details[0])} Ethers</div> : <div className="header">{parseFloat(details[0])} Ethers</div>}
                <div className="description"> 
                    Minimum Contribution for this Campaign.
                </div>
                </div>
            </div>
            <div className="card">
                <div className="content">
                { details[1] ? <div className="header">{formatEther(details[1])} Ethers</div> : <div className="header">{parseFloat(details[1])} Ethers</div>}
                <div className="description">
                    Total Contribution
                </div>
                </div>
            </div>
            <div className="card">
                <div className="content">
                <div className="header">{parseInt(details[3])}</div>
                <div className="description">
                    Number of Contributors
                </div>
                </div>
            </div>
        </div>
    );
}
