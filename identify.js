const Clarifai = require('clarifai');
const fs = require('fs');
const kidImages = require('./kid_data.json');
// get API key
require('dotenv').config();
const key = process.env.CLARIFAI_API_KEY;

// TODO: change path to a file admin_data.json
const ADMIN_JPG_DIR = './test_pos_data/'; // './admin_data.json'
const BATCH_SIZE = 32;

const ADMIN_CONCEPT = {
  id: 'Admin',
  value: true
}

const NOT_ADMIN_CONCEPT = {
  id: 'Admin',
  value: false
}

const KID_CONCEPT = {
  id: 'Kid',
  value: true
}

const NOT_KID_CONCEPT = {
  id: 'Kid',
  value: false
}

const readFile = function(dirPath) {
  return fs.readdirSync(dirPath).map((file) => {
    return fs.readFileSync(dirPath + file).toString('base64')
  })
}


// Used to convert file into an acceptable object for Clarifai
const convertToInput = function(input, concepts, isBase64) {
  const obj = {
    concepts: concepts
  }

  if (isBase64) {
    obj.base64 = input;
    return obj;
  }

  obj.url = input;
  return obj;
} 

// convert photos to base64
const adminImages = readFile(ADMIN_JPG_DIR);

// Instantiate a new Clarifai app by passing in your API key.
const app = new Clarifai.App({apiKey: key});  

const uploadInputs = function(inputs) {
  for(let index = 0; index < inputs.length; index += BATCH_SIZE){
    console.log("Current batch: " + (index / BATCH_SIZE + 1))
    let imageList = []

    for(let current = 0; (current + index < inputs.length) && current < BATCH_SIZE; current++){
      imageList.push(inputs[current + index]);
    }

    // Uploads inputs to Clarifai
    // REQUIRED for Visual Search or Custom Training
    app.inputs.create(imageList).then(
      // Success
      (response) => { console.log('Uploaded initial inputs:', response) },
      // Error
      (error) => { console.error('Error in uploading initial inputs:', error) }
    )
  }
}

const addAdmin = function() {

  // combine pos and neg results for admin
  const allImages = (adminImages.map(i => convertToInput(i, [ADMIN_CONCEPT, NOT_KID_CONCEPT], true))).concat(kidImages.map(i => convertToInput(i, [KID_CONCEPT, NOT_ADMIN_CONCEPT], false)));
  console.log("Number of images to process: " + allImages.length);

  // upload starting images to clarify
  uploadInputs(allImages);

  // create model for admin
  app.models.create(
    "admin",
    [
      { "id": "admin" }
    ]
  ).then(
    function(response) {
      console.log('Created model:', response);
      // train the model
      app.models.train("{model_id:admin}").then(
        function(response) {
          // do something with response
          console.log('Trained:', response);
        },
        function(err) {
          // there was an error
          console.log('Error in training:', err);
        }
      );
    },
    function(err) {
      console.log('Error creating model:', err);
    }
  );
  
}

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

module.exports = {
    identify,
    addAdmin
}