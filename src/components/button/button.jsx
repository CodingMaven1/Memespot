import React from "react";

import './button.scss';

const Button = (props) => {
    let { isGoogle, onClick, type, children } = props;
    return(
        <button className={`${isGoogle ? "Button--Google" : ''} Button`} onClick={onClick} type={type}>
            {children}
        </button>
    )
}

export default Button;