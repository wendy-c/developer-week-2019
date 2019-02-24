import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import './App.css';

import Login from './Login';
import Signup from './Signup';
import KeySetup from './KeySetup';
import Auth from './components/Auth'
import Dashboard from './Dashboard';

class App extends Component {

  render() {
    return (
      <BrowserRouter className="App">
      <Switch>
        <Route path="/" exact component={Login}/>
        <Route path="/signup" exact component={Signup}/>
        <Route path="/keysetup/:name/:email" exact component={KeySetup}/>
        <Route path="/facepassport" exact component={Auth}/>
        <Route path="/dashboard" exact component={Dashboard}/>
      </Switch>
      </BrowserRouter>  
    );
  }
}

export default App;
