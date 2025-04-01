import React from "react";

function TextComponent({style, content}){
    return (
        <div>
            <h2 style={style}>{content}</h2>
        </div>
    )
}
export default TextComponent;