import React from "react";

import './navbar.scss';

const Navbar = (props) => {
    return(
        <div className="Navbar">
            <h1 className="Navbar--Title">MemeSpot</h1>
            <div className="Navbar--Links">
                <label htmlFor="file" className="Navbar--Links--Label">Upload</label>
                <input type="file" id='file' className="Navbar--Links--Link" onChange={props.clicked} />
            </div>
        </div>
    )
}

export default Navbar;