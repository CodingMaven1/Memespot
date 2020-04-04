import React from 'react';
import {Switch, Route, withRouter} from "react-router-dom";
import Navbar from "./components/navbar/navbar";
import Memepage from './pages/memepage/memepage';
import './App.css';

class App extends React.Component {

  constructor(){
    super();
    this.state = {
      currentUser: null
    }
  }


  render(){
    return (
      <div className="App">
        <Navbar/>
        <Switch>
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
