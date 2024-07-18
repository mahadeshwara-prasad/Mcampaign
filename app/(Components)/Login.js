import React from "react";
import 'semantic-ui-css/semantic.min.css';

export default function Login(props){

    return(
        
            <div className="ui placeholder segment">
                <div className="ui two column very relaxed stackable grid">
                    <div className="column">
                    <div className="ui form">
                        <div className="ui center aligned container">
                            <h1>Welocome to mCampaign</h1>
                        </div>
                    </div>
                    </div>
                    <div className="middle aligned column">
                    <button className="ui google plus button" onClick={props.connectWallet}>
                        Connect to Metamask
                    </button>
                    </div>
                </div>
                <div className="ui vertical divider">
                    Or
                </div>
            </div>
       
    );
}