import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import AgoraRTC from 'agora-rtc-sdk';

class Login extends Component {
  state = {
    username: '',
    password: ''
  }

  componentDidMount() {
    const client = AgoraRTC.createClient({mode: 'live', codec: "h264"});

    client.init('e98b454d6cf942f792c53ec2d39b79a3', function () {
      console.log("AgoraRTC client initialized");
    
    }, function (err) {
      console.log("AgoraRTC client init failed", err);
    });
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