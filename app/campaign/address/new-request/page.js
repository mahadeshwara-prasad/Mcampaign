"use client"
import React, { Suspense } from "react";
import Form from "./(Components)/Form";


export default function Page({searchParams}){

    return(
        <Suspense>
            <h1>Create your New Request</h1>
            <Form address={searchParams.address}></Form>
        </Suspense>
        
    )

}