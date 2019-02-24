import React, { Component } from 'react';

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
          <span>
            Username: <input name="username" value={this.state.username} onChange={this.handleChange}/>
          </span>
          <span>
          Password: <input name="password" value={this.state.password} onChange={this.handleChange}/>
          </span>
          <button>Login</button>
        </form>
        </header>
      </div>  
    );
  }
}

export default Login;