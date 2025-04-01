"use client"
import React from "react";
import { useEmailTemplate, useScreenSize } from "@/app/provider";
import { useDragElementLayout } from "@/app/provider";
import { useState } from "react";
import ColumnLayout from "../LayoutElements/ColumnLayout";

function Canvas(){
    const {screenSize , setScreenSize} = useScreenSize();
    const {dragElementLayout, setDragElementLayout} = useDragElementLayout();
    const {emailTemplate, setEmailTemplate} = useEmailTemplate();
    const[dragOver , setDragOver] = useState(false);

    const onDragOver=(e)=>{
        e.preventDefault();
        setDragOver(true);
        console.log('over...');
    }
    const onDropHandle=()=>{
        setDragOver(false);
        if(dragElementLayout?.dragLayout){
            setEmailTemplate(prev=>[...prev,dragElementLayout?.dragLayout])
        }
    }

    const getLayoutComponent=(layout)=>{
        if(layout?.type == 'column')
        {
            return <ColumnLayout layout={layout}/>
        }
    }

    return(
        <div className='mt-20 flex justify-center'>
            <div className={`bg-white p-6 w-full 
            ${screenSize === 'desktop' ? 'max-w-2xl' : 'max-w-md'}
            ${dragOver && 'bg-orange-200 p-4'}`}
            onDragOver={onDragOver}
            onDrop={onDropHandle}
            >
                {emailTemplate?.length > 0 
                    ? emailTemplate?.map((layout, index) => (
                        <div key={index}>
                            {getLayoutComponent(layout)}
                        </div>
                    )) 
                    : <h2 className='p-4 text-center bg-gray-100 border border-dashed'>Add Layout Here</h2>
                }
            </div>
        </div>
    )
}

export default Canvas;
