import React from "react";

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
            mode = <div>
                <h1>Sign Up</h1>
                <h2>Already registered? <button onClick={this.onClickHandler}>Login</button></h2>
                {/* <SignUp /> */}
            </div>
        }

        else{
            mode = <div>
                <h1>Login</h1>
                <h2>New to Memespot <button onClick={this.onClickHandler}>Sign Up</button></h2>
                {/* <Login /> */}
            </div>
        }

        return(
            <div>
                {mode}
            </div>
        )
    }

}

export default SignIn;