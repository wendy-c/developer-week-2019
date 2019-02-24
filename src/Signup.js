import React, { Component } from "react";

class Signup extends Component {
  state = {
    email: "",
    name: "",
    password: "",
    confirmPassword: "",
    error: ""
  };

  handleSubmit = event => {
    event.preventDefault();
    // TODO: Create new user in the server

    // **** code for Docusign *****
    const { fullname, email, password, confirmPassword } = this.state;

    if (password !== confirmPassword) {
      this.setState({ error: "Password does not match!" });
      return;
    }

    if (!fullname || !password || !email) {
      this.setState({ error: "All fields must be filled in!" });
      return;
    }

    fetch(
      `${process.env.REACT_APP_API_URL}/signdoc?name=${fullname}&email=${email}`
    ).then(res => {
      console.log("success!");
    });
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const actionUrl = `${process.env.REACT_APP_API_URL}/register?name=${
      this.state.name
    }&email=${this.state.email}`;
    return (
      <div className="page-header">
        <div className="signup-form">
          {this.state.error && (
            <h1 style={{ color: "red" }}>{this.state.error}</h1>
          )}
          <h1>Sign up with RoboSitter</h1>
          <form method="post" action={actionUrl}>
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
            <button>Submit</button>
          </form>
        </div>
      </div>
    );
  }
}

export default Signup;
