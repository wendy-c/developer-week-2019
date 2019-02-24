import React, { Component } from 'react';

class KeySetup extends Component {
  handleClick = event => {
    // TODO: api call to set up yubico here
  }

  render() {
    return <div>
      <h1>Confirmation</h1>
      <div>
        Name: {this.props.match.params.name}
      </div>
      <div>
        Email: {this.props.match.params.email}
      </div>
      <button handleClick={this.handleClick}>Setup key</button>
    </div>
  }
}

export default KeySetup;