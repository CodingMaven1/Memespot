import React from 'react';
import {Switch, Route, withRouter} from "react-router-dom";
import Memepage from './pages/memepage/memepage';
import './App.css';

class App extends React.Component {

  render(){
    console.log(document.activeElement)
    return (
      <div className="App">
        <Switch>
          <Route path="/" render={() => {
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
