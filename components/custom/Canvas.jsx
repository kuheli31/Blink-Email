"use client"
import React from "react";
import { useScreenSize } from "@/app/provider";

function Canvas(){
    const {screenSize , setScreenSize} = useScreenSize();
    return(
        <div className='mt-20 flex justify-center'>
            <div className={`bg-white p-6 w-full 
            ${screenSize === 'desktop' ? 'max-w-2xl' : 'max-w-md'}`}>


            </div>
        </div>
    )
}

export default Canvas;