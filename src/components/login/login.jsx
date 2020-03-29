import React from "react";

import './login.scss';

class Login extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            email: '',
            password: ''
        }
    }

    render(){
        return(
            <div>
                <form onSubmit={this.onSubmitHandler}>
                    
                </form>
            </div>
        )
    }
}

export default Login;