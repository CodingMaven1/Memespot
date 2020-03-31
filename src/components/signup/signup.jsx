import React from "react";
import {auth, createUserProfileDocument} from '../../firebase/firebase.utils';
import InputElement from '../input/input';
import Button from "../button/button";
import './signup.scss';

class SignUp extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            displayName: "",
            email: "",
            password: "",
            confirmPassword: ""
        }
    }

    onSubmitHandler = async event => {
        event.preventDefault();

        const { displayName, email, password, confirmPassword } = this.state;

        if (password !== confirmPassword) {
          alert("passwords don't match");
          return;
        }
    
        try {
          const { user } = await auth.createUserWithEmailAndPassword(
            email,
            password
          );
    
          await createUserProfileDocument(user, { displayName });
    
          this.setState({
            displayName: '',
            email: '',
            password: '',
            confirmPassword: ''
          });
        } catch (error) {
          console.error(error);
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
                <form className="Signup--Form" onSubmit={this.onSubmitHandler}>
                    <InputElement type="text" placeholder="Name" value={this.state.displayName} changed={event => this.onChangeHandler(event,"displayName")} />
                    <InputElement type="email" placeholder="Email" value={this.state.email} changed={event => this.onChangeHandler(event,"email")} />
                    <InputElement type="password" placeholder="Password" value={this.state.password} changed={event => this.onChangeHandler(event,"password")} />
                    <InputElement type="password" placeholder="Password" value={this.state.confirmPassword} changed={event => this.onChangeHandler(event,"confirmPassword")} />
                    <Button type="submit">Sign Up</Button>
                </form>
            </div>
        )
    }

}

export default SignUp;