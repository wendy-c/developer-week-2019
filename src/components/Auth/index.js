import React, { Component } from 'react';
import { initClientAndJoinChannel, createBase64Arr, takepicture } from './helpers';
import { appID, channel } from './constants';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

export default class Auth extends Component {
    static signup = 5;
    constructor(props) {
        super(props);
        this.state = {
            done: false,
            redirect: false,
            base64Arr: null
        };
    }
    componentDidMount() {
        initClientAndJoinChannel(appID, channel);
        // createBase64Arr(base64 => {
        //     this.setState({
        //         base64Arr: encodeURIComponent(base64),
        //         picCount: this.state.picCount + 1
        //     });
        // }, Auth.signup);
    }

    handleClick = event => {
        const base64 = takepicture();
        // console.log(JSON.stringify(encodeURIComponent(base64)));
        axios({
            method: 'post',
            url: 'http://localhost:8080/facepassport',
            data: JSON.stringify(encodeURIComponent(base64))
        }).then(done => {
            this.setState({done: true});
        });
    }

    handleNext = event => {
        this.setState({redirect: true})
    }

    // componentDidUpdate() {
    //     const { base64Arr } = this.state;
    //     console.log(base64Arr);
    //     axios({
    //         method: 'post',
    //         url: 'http://localhost:8080/facepassport',
    //         data: JSON.stringify(base64Arr),
    //         headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    //     });
    // }

    render() {
        if (this.state.redirect) {
            return <Redirect to="/dashboard"/>
        }
        return (
            <div className="page-header">
                <h3>Time to set up your face passport</h3>
                <div id='camera'/>
                {!this.state.done && <button onClick={this.handleClick} style={{padding: '5px 10px'}}><i className="fas fa-video"></i> Capture</button>}
                {this.state.done && <h3>DONE!</h3>}
                {this.state.done && <button onClick={this.handleNext} style={{padding: '5px 10px'}}>Next</button>}
            </div>  
        );   
    }
  }
  