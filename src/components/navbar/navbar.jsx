import React from "react";
import {auth} from '../../firebase/firebase.utils';
import {Link} from 'react-router-dom';
import './navbar.scss';

const Navbar = (props) => {
    return(
        <div className="Navbar">
            <h1 className="Navbar--Title">MemeSpot</h1>
            <div className="Navbar--Links">
                <Link className="Navbar--Links--Link" to="/">Home</Link>
                {
                    props.currentUser ? 
                    (
                        <div className="Navbar--NewLinks">
                            <Link className="Navbar--Links--Link" to="/savedmemes">Your memes</Link>
                            <div className="Navbar--Links--Link" onClick={() => auth.signOut()}>Sign Out</div>
                        </div>
                    ) : (<Link className="Navbar--Links--Link" to="/signin">Sign In</Link>)

                }
            </div>
        </div>
    )
}

export default Navbar;