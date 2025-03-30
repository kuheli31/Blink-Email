import Layout from "@/Data/Layout";
import React from "react";
import ElementLayoutCard from "./ElementLayoutCard";
import ElementList from "@/Data/ElementList";

function ElementSidebar(){
    return(
        <div className='p-5 h-screen shadow-sm'>
            <h2 className='font-bold text-lg'>Layouts</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-3">
                {Layout.map((layout, index) => (
                <ElementLayoutCard layout={layout} key={index}/>
                ))}
            </div>

            <h2 className='font-bold text-lg mt-6'>Elements</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-3">
                {ElementList.map((element, index) => (
                <ElementLayoutCard layout={element} key={index}/>
                ))}
            </div>
        </div>
    )
}

export default ElementSidebar;