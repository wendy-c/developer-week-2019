import React, { Component } from 'react';

class KeySetup extends Component {

  render() {

    const actionUrl = `${process.env.REACT_APP_API_URL}/register?name=${
      this.props.match.params.name
    }&email=${this.props.match.params.email}`;
    return (
      <div className="page-header">
        <div className="page-header__container">
        <h3>Your registered account details</h3>
          <span>
            Your Name: <b>{this.props.match.params.name}</b>
          </span>
          <span>
            Your Email: <b>{this.props.match.params.email}</b>
          </span>
          
          <form style={{textAlign: 'center'}} method="post" action={actionUrl}>
          <button style={{padding: '5px 10px', marginTop: '25px'}}>Sign waiver</button>
          </form>
        </div>
      </div>
    )
  }
}

export default KeySetup;