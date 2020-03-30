import React from "react";

import './button.scss';

const Button = (props) => {
    return(
        <button className={`${props.isGoogle ? "Buuton--Google" : ''} Button`} onClick={props.onClick} type={props.type}>
            {props.children}
        </button>
    )
}

export default Button;