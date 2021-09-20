import React from "react";

import './button.scss';

const Button = (props) => {
    let { isGoogle, onClick, children } = props;
    return(
        <button className={`${isGoogle ? "Button--Google" : ''} Button`} onClick={onClick}>
            {children}
        </button>
    )
}

export default Button;