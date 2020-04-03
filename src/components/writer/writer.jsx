import React from "react";
import './writer.scss';

const Writer = (props) => {

    return(
            <textarea rows="3" cols="15" className="Writer" onClick={props.clicked} style={{position: 'absolute', fontSize: `${props.size + "px"}`, color: props.color, top: props.top, left: props.left}} value={props.value} onChange={props.changed} type="text" />
    )
}

export default Writer;