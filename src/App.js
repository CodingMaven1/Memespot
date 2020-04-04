import React from 'react';
import {Switch, Route, withRouter} from "react-router-dom";
import Memepage from './pages/memepage/memepage';
import './App.css';

class App extends React.Component {

  constructor(){
    super();
    this.state = {

    }
  }


  render(){
    return (
      <div className="App">
        <Switch>
          <Route exact path="/" render={() => {
            return(
              <Memepage />
            )
          }} />
        </Switch>
      </div>
    );
  }

}

export default withRouter(App);
