import React from "react";
import Login from '../../components/login/login';
import SignUp from '../../components/signup/signup';
import './signup-login.scss';

class SignIn extends React.Component {

    constructor(){
        super();

        this.state = {
            newuser : true
        }
    }

    onClickHandler = () => {
        let newuser = this.state.newuser;
        this.setState({newuser: !newuser})
    }

    render(){

        let mode;

        if(this.state.newuser){
            mode = <div className="Signup-login-mode signup">
                <h1 className="Signup-login-mode-title">Sign Up</h1>
                <h2 className="Signup-login-mode-toggle">Already registered? <button className="Signup-login-mode-button" onClick={this.onClickHandler}>Login</button></h2>
                <SignUp />
            </div>
        }

        else{
            mode = <div className="Signup-login-mode login">
                <h1 className="Signup-login-mode-title">Login</h1>
                <h2 className="Signup-login-mode-toggle">New to Memespot? <button className="Signup-login-mode-button" onClick={this.onClickHandler}>Sign Up</button></h2>
                <Login />
            </div>
        }

        return(
            <div className="Signup-login">
                {mode}
            </div>
        )
    }

}

export default SignIn;