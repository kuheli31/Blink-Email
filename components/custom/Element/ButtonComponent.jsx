import React from 'react';

function ButtonComponent({ style, content, url }) {
    const handleClick = (event) => {
        event.preventDefault();  // Prevent page reload

    };

    return (
        <div>
            <button style={style} onClick={handleClick}>{content}</button>
        </div>
    );
}

export default ButtonComponent;
