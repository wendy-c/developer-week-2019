import React from 'react';
import AgoraRTC from 'agora-rtc-sdk';
import dotenv from "dotenv";
dotenv.config();

// see https://docs.agora.io/en/Interactive%20Broadcast/API%20Reference/web/interfaces/agorartc.stream.html#setvideoprofile
const cameraVideoProfile = '480p_2';
const appID = process.env.REACT_APP_AGORA_API;
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
    joinChannel(channelName);
  }, function (err) {
    console.log("[ERROR] : AgoraRTC client init failed", err);
  });
}

function joinChannel(channelName) {
  const token = null;
  const userID = null;
  client.join(token, channelName, userID, function(uid) {
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
    localStream.play('camera'); // play the given stream within the local-video div id name
    console.log("you're on camera!");
  }, function (err) {
    console.log("[ERROR] : getUserMedia failed", err);
  });
}

export default function Auth(props) {
    initClientAndJoinChannel(appID, channel);
  
    return (
        <div className="Auth">
            <h3>Time to set up your face passport</h3>
            <div id='camera'/>
        </div>  
    );
  }
  