import React, { Component } from 'react';

class Signup extends Component {
  state = {
    email: '',
    fullname: '',
    password: '',
    confirmPassword: '',
    error: ''
  }

  handleSubmit = event => {
    event.preventDefault();
    // TODO: Create new user in the server

    // **** code for Docusign *****
    const {fullname, email, password, confirmPassword} = this.state;

    if (password !== confirmPassword) {
      return this.setState({error: 'Password does not match!'})
    }

    if (!fullname || !password || !email) {
      return this.setState({error: 'All fields must be filled in!'})
    }

    fetch(`${process.env.REACT_APP_API_URL}?name=${fullname}&email=${email}&password=${password}`)
      .then(res => {
        console.log("success!")
      })

  }

  handleChange = event => {
    this.setState({[event.target.name]: event.target.value})
  }

  render() {
    return (
      <div className="signup-form">
      {this.state.error && <h1 style={{color: 'red'}}>{this.state.error}</h1>}
      <h1>Sign up with RoboSitter</h1>
        <form>
        <label>
            Full Name <input name="fullname" value={this.state.fullname}/>
          </label>
          <label>
            Email <input name="email" value={this.state.email}/>
          </label>
          <label>
            Password <input name="password" value={this.state.password}/>
          </label>
          <label>
            Confirm Password <input name="confirmPassword" value={this.state.password}/>
          </label>
          <a href={`{process.env.API_URL}/signdoc`}></a>
          <button>Submit</button>
        </form>
      </div>
    );
  }
}

export default Signup;