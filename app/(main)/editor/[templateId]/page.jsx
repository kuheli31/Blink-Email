import React from "react";
import EditorHeader from "@/components/custom/EditorHeader";
import ElementSidebar from "@/components/custom/ElementSidebar";
import Canvas from "@/components/custom/Canvas";
import Settings from "@/components/custom/Settings";
import { Button } from "@/components/ui/button";

function Editor(){
    return(
        <div>
        <EditorHeader/>

        <div className='grid grid-cols-5'>
        <ElementSidebar/>
        <div className="col-span-3 bg-orange-100">
            <Canvas/>
        </div>
        <Settings/>
        </div>

        </div>
    )
}

export default Editor;