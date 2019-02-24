import React from 'react';
import AgoraRTC from 'agora-rtc-sdk';

const cameraVideoProfile = '480p_2'; // 640 × 480 @ 30fps  & 750kbs
const appID = 'e98b454d6cf942f792c53ec2d39b79a3';
const channel = 'test';
const localStreams = {
  camera: {
    id: "",
    stream: {}
  },
  screen: {
    id: "",
    stream: {}
  }
};

const client = AgoraRTC.createClient({mode: 'live', codec: "h264"});

function initClientAndJoinChannel(agoraAppId, channelName) {
  client.init(agoraAppId, function () {
    console.log("AgoraRTC client initialized");
    joinChannel(channelName);
  }, function (err) {
    console.log("[ERROR] : AgoraRTC client init failed", err);
  });
}

function joinChannel(channelName) {
  const token = null;
  const userID = null;
  client.join(token, channelName, userID, function(uid) {
      console.log("User " + uid + " join channel successfully");
      createCameraStream(uid);
      localStreams.camera.id = uid; 
  }, function(err) {
      console.log("[ERROR] : join channel failed", err);
  });
}

function createCameraStream(uid) {
  var localStream = AgoraRTC.createStream({
    streamID: uid,
    audio: true,
    video: true,
    screen: false
  });
  localStream.setVideoProfile(cameraVideoProfile);
  localStream.init(function() {
    console.log("getUserMedia successfully");
    localStream.play('camera'); // play the given stream within the local-video div id name
    console.log("you're on camera!");
  }, function (err) {
    console.log("[ERROR] : getUserMedia failed", err);
  });
}

export default class Auth extends Component {
    componentDidMount() {
      initClientAndJoinChannel(appID, channel);
    }
  
    render() {
      return (
        <div className="Auth">
            <div id='camera'/>
        </div>  
      );
    }
  }
  