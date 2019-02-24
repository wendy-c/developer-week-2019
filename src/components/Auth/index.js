import React, { Component } from 'react';
import { initClientAndJoinChannel, createBase64Arr } from './helpers';
import { appID, channel } from './constants';
import axios from 'axios';

export default class Auth extends Component {
    static signup = 5;
    constructor(props) {
        super(props);
        this.state = {
            base64Arr: null
        };
    }
    componentDidMount() {
        initClientAndJoinChannel(appID, channel);
        createBase64Arr(base64 => {
            this.setState({
                base64Arr: encodeURIComponent(base64),
                picCount: this.state.picCount + 1
            });
        }, Auth.signup);
    }

    componentDidUpdate() {
        const { base64Arr } = this.state;
        console.log(base64Arr);
        axios({
            method: 'post',
            url: 'http://localhost:8080/facepassport',
            data: JSON.stringify(base64Arr),
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        });
    }

    handleClick(e) {
        e.preventDefault();
        
    }
    render() {
        return (
            <div className="Auth">
                <h3>Time to set up your face passport</h3>
                <div id='camera'/>
            </div>  
        );   
    }
  }
  