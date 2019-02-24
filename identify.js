const Clarifai = require('clarifai');

// get API key
require('dotenv').config();
const key = process.env.CLARIFAI_API_KEY;

const ADMIN_JPG_PATH = './data.json';
const BATCH_SIZE = 32;

const ADMIN_CONCEPT = {
  id: 'Admin',
  value: true
}

const NOT_ADMIN_CONCEPT = {
  id: 'Admin',
  value: false
}

const readFile = function(dirPath) {
  return fs.readdirSync(dirPath).map((file) => {
    return fs.readFileSync(dirPath + file).toString('base64')
  })
}

// Used to convert file into an acceptable object for Clarifai
const convertToInput = function(input, concept) {
  return {
    base64: input,
    concepts: [concept]
  }
} 

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
      (response) => { console.log(response) },
      // Error
      (error) => { console.error(error) }
    )
  }
}

const addAdmin = function() {

  // TODO: get path for admin and not admin images
  const images = readFile(ADMIN_JPG_PATH)
  console.log("Number of images to process: " + images.length)

  // add positive images for admin
  uploadInputs(images.map((image) => { return convertToInput(image, ADMIN_CONCEPT) })); 

  // create model for admin
  app.models.create(
    "Admin",
    [
      { "id": "admin" }
    ]
  ).then(
    function(response) {
      console.log(response);
    },
    function(err) {
      console.log(err);
    }
  );

  // add negative results for admin
  uploadInputs(images.map((image) => { return convertToInput(image, NOT_ADMIN_CONCEPT) })); 

  // create model for non-admin
  app.models.create(
    "non-Admin",
    [
      { "id": "non-admin" }
    ]
  ).then(
    function(response) {
      console.log(response);
    },
    function(err) {
      console.log(err);
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