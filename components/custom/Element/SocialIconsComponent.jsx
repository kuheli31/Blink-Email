import React from "react";

function SocialIconsComponent({ socialIcons, style, outerStyle }) {
    return (
        <div style={outerStyle}>
            {socialIcons.map((icon, index) => (
                <a key={index} href={icon.url} target="_blank" rel="noopener noreferrer">
                    <img src={icon.icon} alt={`social-icon-${index}`} style={style} />
                </a>
            ))}
        </div>
    );
}

export default SocialIconsComponent;
