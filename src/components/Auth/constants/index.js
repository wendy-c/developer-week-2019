export const width = 640;    // We will scale the photo width to this
export const height = 480

// see https://docs.agora.io/en/Interactive%20Broadcast/API%20Reference/web/interfaces/agorartc.stream.html#setvideoprofile
export const cameraVideoProfile = '480p_2';
export const appID = process.env.REACT_APP_AGORA_API;
export const channel = 'test';
export const localStreams = {
    camera: {
        id: "",
        stream: {}
    },
    screen: {
        id: "",
        stream: {}
    }
};

export const photo = document.createElement('img');
export const canvas = document.createElement('canvas');