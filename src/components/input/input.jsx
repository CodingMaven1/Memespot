import React from "react";

import './input.scss';

const InputElement = (props) => {
    let { changed, type, placeholder, value } = props;
    return(
        <input className="Input" onChange={changed} type={type} placeholder={placeholder} value={value} />
    )
}

export default InputElement;