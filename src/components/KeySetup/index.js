import React, { Component } from 'react';

class KeySetup extends Component {

  handleClick = event => {
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