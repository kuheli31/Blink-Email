"use client"
import React, { useState } from "react";
import EditorHeader from "@/components/custom/EditorHeader";
import ElementSidebar from "@/components/custom/ElementSidebar";
import Canvas from "@/components/custom/Canvas";
import Settings from "@/components/custom/Settings";
import ViewHTMLdialogue from "@/components/custom/ViewHTMLdialogue";

console.log({
    EditorHeader,
    ElementSidebar,
    Canvas,
    Settings,
    ViewHTMLdialogue
  });
  
function Editor() {
    const [viewHTMLCode, setViewHTMLCode] = useState(false);
    const [htmlCode, setHtmlCode] = useState(""); // State to store HTML content

    return (
        <div>
            <EditorHeader setViewHTMLCode={setViewHTMLCode} />

            <div className='grid grid-cols-5'>
                <ElementSidebar />
                <div className="col-span-3 bg-orange-100">
                    <Canvas viewHTMLCode={viewHTMLCode} setHtmlCode={setHtmlCode} />
                </div>
                <Settings />
            </div>

            {/* Dialog to show HTML code */}
            <ViewHTMLdialogue opendialog={viewHTMLCode} htmlcode={htmlCode} onClose={() => setViewHTMLCode(false)} />
        </div>
    );
}

export default Editor;