import React from "react";
import { Textarea } from "@/components/ui/textarea"

function TextAreaField({label , value , onHandleInputChange}){
    return(
        <div>
            <label>{label}</label>
            <Textarea value={value} onChange={(e)=>onHandleInputChange(e.target.value)}/>
        </div>
    )
}

export default TextAreaField;