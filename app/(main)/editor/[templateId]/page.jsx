"use client"
import React, { useEffect, useState } from "react";
import EditorHeader from "@/components/custom/EditorHeader";
import ElementSidebar from "@/components/custom/ElementSidebar";
import Canvas from "@/components/custom/Canvas";
import Settings from "@/components/custom/Settings";
import ViewHTMLdialogue from "@/components/custom/ViewHTMLdialogue";
import { useParams } from "next/navigation";
import { useUserDetail } from "@/app/provider";
import { useConvex } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useEmailTemplate } from "@/app/provider";


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
    const {userDetail , setUserDetail} = useUserDetail();
    const {emailTemplate , setEmailTemplate} = useEmailTemplate();
    const [loading , setLoading] = useState(false);
    const {templateId} = useParams(); // Get the templateId from the URL
    const convex = useConvex();

    useEffect(() => {
        if(userDetail)
        {
            GetTemplateData();
        }
    },[userDetail])

    const GetTemplateData=async()=>{
        setLoading(true);
        const result =await convex.query(api.emailTemplate.GetTemplateDesign,{
            tid:templateId,
            email:userDetail?.email
        });
        console.log(result);
        setEmailTemplate(result?.design);
        setLoading(false);
    }
    return (
        <div>
            <EditorHeader setViewHTMLCode={setViewHTMLCode} />

            {!loading? <div className='grid grid-cols-5'>
                <ElementSidebar />
                <div className="col-span-3 bg-orange-100">
                    <Canvas viewHTMLCode={viewHTMLCode} setHtmlCode={setHtmlCode} />
                </div>
                <Settings />
            </div> :

            <div> 
                <h2>Please Wait..</h2>
            </div>
            }

            {/* Dialog to show HTML code */}
            <ViewHTMLdialogue opendialog={viewHTMLCode} htmlcode={htmlCode} onClose={() => setViewHTMLCode(false)} />
        </div>
    );
}

export default Editor;