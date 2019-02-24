import React, { Component } from 'react';

class KeySetup extends Component {
  handleClick = event => {
    // TODO: api call to set up yubico here
  }

  render() {
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
          <button handleClick={this.handleClick}>Set up key</button>
        </div>
      </div>
    )
  }
}

export default KeySetup;