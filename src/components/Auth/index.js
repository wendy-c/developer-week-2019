import React, { Component } from 'react';
import { initClientAndJoinChannel, createBase64Arr } from './helpers';
import { appID, channel } from './constants';

export default class Auth extends Component {
    constructor(props) {
        super(props);
        this.state = {
            base64Arr: []
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

    render() {
        console.log(this.state.base64Arr);
        return (
            <div className="Auth">
                <h3 onClick={this.handleClick}>Time to set up your face passport</h3>
                <div id='camera'/>
            </div>  
        );   
    }
  }
  