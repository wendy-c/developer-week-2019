import React, { Component } from 'react';
import {Link, Redirect} from 'react-router-dom';
import axios from 'axios';
import {register, sign} from 'u2f-api';

// const session = window.sessionStorage;

class Login extends Component {
  state = {
    username: '',
    password: '',
    redirect: false
  }

  handleSubmit = event => {
    event.preventDefault();

    // TODO: Send this.state.username and this.state.password to the server to authenticate user
    sessionStorage.setItem('user_permission', 'admin')
    this.setState({redirect: true, type: 'login'})
  }

  handleChange = event => {
    this.setState({[event.target.name]: event.target.value})
  }
  handleClick = event => {
    /*
    axios.get('https://localhost:1989/api/register_req').then(response =>{
      console.log('click res: ', response.data);
      register(response.data).then(res=> {
        console.log('work', res);
        var result = res;
        axios.post('https://localhost:1989/api/register', result).then(res=> {
          console.log('w', res);
          if(res){
            alert('success');
          }else{
            alert(res);
          }
        }).catch(err=>{
          console.log(err);
        });
        }).catch(err=>{
          console.log(err);
          console.log('register err');
        });
      });
      */
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to="/facepassport/login"/>
    }
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
          <button onClick={this.handleClick}>Login</button>
        </form>
        or <Link to="/signup">Signup</Link>
        </header>
      </div>  
    );
  }
}

export default Login;