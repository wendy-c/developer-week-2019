import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import Auth from './Auth';

class Login extends Component {
  state = {
    username: '',
    password: ''
  }

  handleSubmit = event => {
    event.preventDefault();

    // TODO: Send this.state.username and this.state.password to the server to authenticate user

  }

  handleChange = event => {
    this.setState({[event.target.name]: event.target.value})
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
        <form className="login-form" onSubmit={this.handleSubmit}>
        <h1>RoboSitter</h1>
          <label>
            Email <input name="username" value={this.state.username} onChange={this.handleChange}/>
          </label>
          <label>
          Password <input name="password" value={this.state.password} onChange={this.handleChange}/>
          </label>
          <button>Login</button>
        </form>
        or <Link to="/signup">Signup</Link>
        </header>
      </div>  
    );
  }
}

export default Login;