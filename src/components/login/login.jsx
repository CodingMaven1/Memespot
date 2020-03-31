import React from "react";
import {auth, signInWithGoogle} from '../../firebase/firebase.utils';
import InputElement from "../input/input";
import Button from '../button/button';
import './login.scss';

class Login extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            email: '',
            password: ''
        }
    }

    onSubmitHandler = async event => {
        event.preventDefault();

        const {email, password} = this.state;

        try{
          await auth.signInWithEmailAndPassword(email, password);
    
          this.setState({ email: '', password: ''})
        }
        catch(error){
          console.log(error);
        }
    }


    onChangeHandler = (event,type) => {
        let value = this.state;
        value[type] = event.target.value;
        this.setState({value})
    }

    render(){
        return(
            <div>
                <form className="Login--Form" onSubmit={this.onSubmitHandler}>
                    <InputElement type="email" value={this.state.email} placeholder="Email" changed={event => this.onChangeHandler(event, "email")} />
                    <InputElement type="password" value={this.state.password} placeholder="Password" changed={event => this.onChangeHandler(event, "password")} />
                    <div className="Login--Form--Buttons">
                        <Button type="submit">Login</Button>
                        <Button onClick={signInWithGoogle} isGoogle>Sign in with Google</Button>
                    </div>

                </form>
            </div>
        )
    }
}

export default Login;