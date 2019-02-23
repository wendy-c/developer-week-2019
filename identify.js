const Clarifai = require('clarifai');

// get API key
require('dotenv').config();
const key = process.env.CLARIFAI_API_KEY;

// Instantiate a new Clarifai app by passing in your API key.
const app = new Clarifai.App({apiKey: key});

const identify = (picUrl) => {
    // Predict the contents of an image by passing in a URL.
    app.models.predict(Clarifai.GENERAL_MODEL, picUrl)
    .then(response => {
        console.log(response);
    })
    .catch(err => {
        console.log(err);
    });
}

module.exports = identify;