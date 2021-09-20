import React from "react";

import './card.scss';

const Card = (props) => {
    let { meme, clicked } = props;
    let { url, id, name } = meme;

    return(
        <div className="Card" onClick={clicked} >
            <img src={url} alt={id} className="Card--Img" />
            <div className="Card--Content">
                <h1 className="Card--Title">{name}</h1>
            </div>
        </div>
    )
}

export default Card;
