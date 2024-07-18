import React, { Children } from "react";
import Header from "./(Components)/Header";

export default function Layout({children}){

    return(
        <div className="ui container">
            <Header></Header>
            {children}
        </div>
        
    );
}