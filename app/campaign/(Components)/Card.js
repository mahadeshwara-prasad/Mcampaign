import React from "react";
import 'semantic-ui-css/semantic.min.css';

export default function Card(props){
    return(
        <div className="ui fluid card">
            <div className="content">
                <div className="center aligned header">{props.info.keyName}</div>
                <div className="center aligned description">
                <p>{props.info.keyAddress}</p>
                </div>
            </div>
            <div className="extra content">
                <div className="center aligned author">
                {props.info.description}
                </div>
            </div>
        </div>
    );
}