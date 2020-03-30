import React from 'react';
import {auth,createUserProfileDocument} from './firebase/firebase.utils';
import SignIn from './pages/signup-login/signup-login';
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
        <SignIn />
      </div>
    );
  }

}

export default App;
