import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import {register} from 'u2f-api';

class KeySetup extends Component {

  state = {
    redirect: false
}
  handleClick = event => {
    // TODO: api call to set up yubico here
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