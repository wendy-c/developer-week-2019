import React, { Component } from "react";
import {Redirect} from 'react-router-dom';
import axios from 'axios';
import {register} from 'u2f-api';

class Signup extends Component {
  state = {
    email: "",
    name: "",
    password: "",
    confirmPassword: "",
    error: ""
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = event => {
    this.setState({redirect: true})
    
    axios.get('https://localhost:1989/api/register_req').then(response =>{
      console.log('click res: ', response.data);
      register(response.data).then(res=> {
        console.log('work', res);
        axios.post('https://localhost:1989/api/register', res).then(res=> {
          console.log('w', res);
          if(res){
            alert('Registration Success!');
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
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to={`/keysetup/${this.state.name}/${this.state.email}`} />
    }
    return (
      <div className="page-header">
        <div className="signup-form">
          {this.state.error && (
            <h1 style={{ color: "red" }}>{this.state.error}</h1>
          )}
          <h1>Sign up with RoboSitter</h1>
          <form onSubmit={this.handleSubmit}>
            <label>
              Full Name{" "}
              <input
                name="name"
                value={this.state.name}
                onChange={this.handleChange}
              />
            </label>
            <label>
              Email{" "}
              <input
                name="email"
                value={this.state.email}
                onChange={this.handleChange}
              />
            </label>
            <label>
              Password{" "}
              <input
                name="password"
                value={this.state.password}
                onChange={this.handleChange}
              />
            </label>
            <label>
              Confirm Password{" "}
              <input
                name="confirmPassword"
                value={this.state.confirmPassword}
                onChange={this.handleChange}
              />
            </label>
            <button>Set up key</button>
          </form>
        </div>
      </div>
    );
  }
}

export default Signup;
