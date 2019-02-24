import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

class KeySetup extends Component {
  state = {
    redirect: false
  }

  handleClick = event => {
    // TODO: api call to set up yubico here
    this.setState({redirect: true})
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to="/facepassport/signup" />
    }
    return (
      <div className="page-header">
        <div className="page-header__container">
          <span>
            Your Name: <b>{this.props.match.params.name}</b>
          </span>
          <span>
            Your Email: <b>{this.props.match.params.email}</b>
          </span>
          <h3>Now, it's time to set up your key.</h3>
          <button onClick={this.handleClick}>Set up key</button>
        </div>
      </div>
    )
  }
}

export default KeySetup;