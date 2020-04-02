import React from "react";
import './writer.scss';

const Writer = (props) => {

    return(
            <input className="Writer" onClick={props.clicked} style={{position: 'absolute', top: props.top, left: props.left}} value={props.value} onChange={props.changed} type="text" placeholder="Enter text" />
    )
}

export default Writer;