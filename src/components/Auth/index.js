import React, { Component } from 'react';
import { initClientAndJoinChannel, createBase64Arr } from './helpers';
import { appID, channel } from './constants';
import { Redirect } from 'react-router-dom';

export default class Auth extends Component {
    constructor(props) {
        super(props);
        this.state = {
            base64Arr: [],
            done: false,
            redirect: false
        };
    }
    componentDidMount() {
        initClientAndJoinChannel(appID, channel);
        createBase64Arr(base64 => {
            this.setState({
                base64Arr: [
                    ...this.state.base64Arr, base64
                ]
            });
        });
    }

    handleClick = event => {
        
        setTimeout(() => {
            this.setState({done: true})
        }, 3000);
    }

    handleNext = event => {
        this.setState({redirect: true})
    }

    render() {
        if (this.state.redirect) {
            return <Redirect to="/dashboard"/>
        }
        return (
            <div className="page-header">
                <h3 onClick={this.handleClick}>Time to set up your face passport</h3>
                <div id='camera'/>
                {!this.state.done && <button onClick={this.handleClick} style={{padding: '5px 10px'}}><i className="fas fa-video"></i> Capture</button>}
                {this.state.done && <h3>DONE!</h3>}
                {this.state.done && <button onClick={this.handleNext} style={{padding: '5px 10px'}}>Next</button>}
            </div>  
        );   
    }
  }
  