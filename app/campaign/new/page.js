"use client"
import { React, Suspense } from "react";
import Form from "./(Components)/Form";



export default function NewCampaign(){


    return(
        <Suspense fallback={<p>Wait till it loads..</p>}>
            <h1>Add Your Campaign</h1>
            <hr></hr>

            <Form></Form>

        </Suspense>
        

    );
}