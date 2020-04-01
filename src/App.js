import React from 'react';
import {Switch, Route, withRouter} from "react-router-dom";
import {auth,createUserProfileDocument} from './firebase/firebase.utils';
import Navbar from "./components/navbar/navbar";
import SignIn from './pages/signup-login/signup-login';
import Memepage from './pages/memepage/memepage';
import './App.css';

class App extends React.Component {

  constructor(){
    super();
    this.state = {
      currentUser: null
    }
  }

  unsubscribeFromAuth = null;

  componentDidMount(){
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if(userAuth){
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot(snapshot => {
          this.setState({
            currentUser : {
              id : snapshot.id,
              ...snapshot.data()
            }
            }, () => console.log(this.state))
            this.props.history.push('/');
        })
      }
      else{
        this.setState({currentUser : null})
      }
    })
  }

  componentWillUnmount(){
    this.unsubscribeFromAuth();
  }

  render(){
    return (
      <div className="App">
        <Navbar currentUser={this.state.currentUser}/>
        <Switch>
          <Route exact path='/signin' component={SignIn} />
          <Route exact path="/" render={() => {
            return(
              <Memepage/>
            )
          }} />
        </Switch>
      </div>
    );
  }

}

export default withRouter(App);
