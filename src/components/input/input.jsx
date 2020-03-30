import React from "react";

import './input.scss';

const InputElement = (props) => {
    return(
        <input className="Input" onChange={props.changed} type={props.type} placeholder={props.placeholder} value={props.value} />
    )
}

export default InputElement;