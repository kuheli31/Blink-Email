import React from "react";

function ImageComponent({ style, imageUrl, outerStyle }) {
    // Prevent rendering if imageUrl is missing or empty
    if (!imageUrl) {
        return null;
    }

    return (
        <div style={outerStyle}>
            <img src={imageUrl} alt="image" style={style} />
        </div>
    );
}

export default ImageComponent;