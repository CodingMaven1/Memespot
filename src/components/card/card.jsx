import React from "react";

import './card.scss';

const Card = (props) => {
    return(
        <div className="Card" onClick={props.clicked} >
            <img src={props.url} alt={props.id} className="Card--Img" />
            <div className="Card--Content">
                <h1 className="Card--Title">{props.text}</h1>
            </div>
        </div>
    )
}

export default Card;
