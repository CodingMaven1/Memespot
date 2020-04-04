import React from "react";
import {auth} from '../../firebase/firebase.utils';
import {Link} from 'react-router-dom';
import './navbar.scss';

const Navbar = (props) => {
    return(
        <div className="Navbar">
            <h1 className="Navbar--Title">MemeSpot</h1>
            <div className="Navbar--Links">

            </div>
        </div>
    )
}

export default Navbar;