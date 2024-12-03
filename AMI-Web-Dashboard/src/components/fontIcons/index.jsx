import './style.css';
import React from 'react';


export const Icons = ({id, name, size = 10, iconColor = '#fff', style}) => {

    return (
        <div
            id={id}>
            <div style={{color: iconColor, fontSize: `${size}px`, marginRight:'5px', marginLeft:'5px'}} className={`icon ico-${name}-ami `}/>
        </div>
    );
};

