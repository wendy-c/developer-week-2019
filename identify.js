const Clarifai = require('clarifai');
const fs = require('fs');
const kidImages = require('./kid_data.json');
const axios = require('axios');
// get API key
require('dotenv').config();
const KEY = process.env.CLARIFAI_API_KEY;

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

var modelVersionId = '';
var modelId = '';

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
const app = new Clarifai.App({apiKey: KEY});  

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
      (response) => { 
        console.log('Uploaded initial inputs:', response);
        // create model
        app.models.create(
          "admin",
          [
            { "id": "Admin" },
            { "id": "Kid" }
          ]
        ).then(
          function(response) {
            console.log('Created model:', response);
            modelId = response.model.id;

            // train model
            app.models.train(JSON.stringify({model_id: modelId})).then(
              function(response) {
                // do something with response
                console.log('Trained:', response);
                modelVersionId = response.model.model_version.id;
              },
              function(err) {
                // there was an error
                console.log('Error in training:', err);
                return undefined;
              }
            )
          },
          function(err) {
            console.log('Error creating model:', err);
            return undefined;
          }
        );
      },
      // Error
      (error) => { console.error('Error in uploading initial inputs:', error) }
    )
  }
}
//  console.log('Can train with model Id: ', modelId_test);

const addAdmin = function(images) {

  // combine pos and neg results for admin
  // const allImages = (adminImages.map(i => convertToInput(i, [ADMIN_CONCEPT, NOT_KID_CONCEPT], true))).concat(kidImages.map(i => convertToInput(i, [KID_CONCEPT, NOT_ADMIN_CONCEPT], false)));
  console.log("Number of images to process: " + images.length);
const allImages = images.map(i => convertToInput(i, [ADMIN_CONCEPT, NOT_KID_CONCEPT], true));
  // upload starting images to clarify
  uploadInputs(allImages);
}

const identify = (picUrl) => {
  console.log('identifying with id:', modelId, 'and version id:', modelVersionId);
    // Predict the contents of an image by passing in a URL.
    // if (modelId && modelVersionId) {
      // app.models.predict({id:"admin"}, {version:"f58ab60b215447178e1ceb9470019252"}, picUrl)
      // .then(response => {
      //     console.log(response);
      //     return response.outputs[0].data.concepts[0].id;
      // })
      // .catch(err => {
      //     console.log(err);
      //     return undefined;
      // });

      axios.post("https://api.clarifai.com/v2/models/admin", {}, {
        headers: {
          "Authorization": "Key " + KEY,
          "Content-Type": "application/json",
          'Access-Control-Allow-Origin': '*'
        }
      }).then((res)=>{console.log('good:', res)}).catch((err)=>{console.log('bad:', err)});
    // }
}

module.exports = {
    identify,
    addAdmin
}