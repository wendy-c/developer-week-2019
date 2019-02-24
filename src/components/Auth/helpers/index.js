import AgoraRTC from 'agora-rtc-sdk';
import dotenv from "dotenv";

import {
    width,
    height,
    cameraVideoProfile,
    localStreams,
    photo,
    canvas
} from '../constants';

dotenv.config();

const client = AgoraRTC.createClient({mode: 'live', codec: "h264"});
let vid;

export function initClientAndJoinChannel(agoraAppId, channelName) {
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
    var elem = document.getElementById('camera');
    var child = elem.children[0];
    var grandchild = child.children[0];
    grandchild['crossOrigin'] = "anonymous";
    vid = grandchild;
  }, function (err) {
    console.log("[ERROR] : getUserMedia failed", err);
  });
}

function takepicture(video) {
    var context = canvas.getContext('2d');
    canvas.width = width;
    canvas.height = height;
    context.drawImage(video, 0, 0, width, height);

    var data = canvas.toDataURL('image/jpeg');
    photo.setAttribute('src', data, 'style', { 'height': 500, 'width': 500 });
    return data;
}

export function createBase64Arr(cb) {
    setTimeout(() => {
        let count = 0;
        const interval = setInterval(() => {
            count += 1;
            if (count === 10) {
                clearInterval(interval);
            }
            cb(takepicture(vid));
        }, 500); 
    }, 1000);
}