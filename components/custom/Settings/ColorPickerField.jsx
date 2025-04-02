import React from "react";

function ColorPickerField({ label, value, onHandleStyleChange }) {
    return (
        <div>
            <label>{label}</label>
            <input 
                type="color" 
                value={value} 
                onChange={(e) => onHandleStyleChange(e.target.value)} // ✅ Call function correctly
            />
        </div>
    );
}

export default ColorPickerField;
