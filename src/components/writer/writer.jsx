import React from "react";
import './writer.scss';

const Writer = (props) => {
    let { clicked, size, color, top, left, value, changed } = props;
    return(
            <textarea rows="3" cols="15" className="Writer" onClick={clicked} 
                style={{ position: 'absolute', fontSize: `${size + "px"}`, color: color, top: top, left: left}} 
                value={value} onChange={changed} type="text" />
    )
}

export default Writer;