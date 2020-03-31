import React from 'react';
import {Switch, Route} from "react-router-dom";
import {auth,createUserProfileDocument} from './firebase/firebase.utils';
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

  unscubscribeFromAuth = null;

  componentDidMount(){
    this.unscubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if(userAuth){
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot(snapshot => {
          this.setState({
            currentUser : {
              id : snapshot.id,
              ...snapshot.data()
            }
            }, () => console.log(this.state))
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
        <Switch>
          <Route exact path='/signin' component={SignIn} />
          <Route exact path="/" component={Memepage} />
        </Switch>
      </div>
    );
  }

}

export default App;
