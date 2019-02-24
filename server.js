const express = require('express');
const path = require('path');
const cors = require('cors');
const axios = require('axios');
var fs = require('fs');
var https = require('https');
const u2f = require('u2f');
const bodyParser = require('body-parser');
const identify = require('./identify').identify;
const addAdmin = require('./identify').addAdmin;


const docusign = require('docusign-esign');
const docusignClient = new docusign.ApiClient();

require('dotenv').config();

const app = express();
app.use(cors())
app.use(express.static(path.join(__dirname, 'build')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.enable('trust proxy')

app.get('/getdata', async (req, res) => {
});

app.post('/facepassport', (req, res) => {
  console.log(req.body);
  res.send(req.body);
});

app.get('/ping', (req, res) => {
  res.send('pong')
})

app.get('/signdoc', function(req, res) {
  const OAuthToken = process.env.DOCUSIGN_OAUTH_TOKEN;
  const accountId = process.env.DOCUSIGN_ACCOUNT_ID;
  const recipientName = req.query.name;
  const recipientEmail = req.query.email;

  const fileName = 'demo-docusign-waiver.pdf';

  docusignClient.setBasePath('https://demo.docusign.net/restapi');
  docusignClient.addDefaultHeader('Authorization', 'Bearer ' + OAuthToken);

  // *** Begin envelope creation ***

  
  //Read the file you wish to send from the local machine.
  fileStream = process.argv[2];
  pdfBytes = fs.readFileSync(path.resolve(__dirname, fileName));
  pdfBase64 = pdfBytes.toString('base64');

  docusign.Configuration.default.setDefaultApiClient(docusignClient);

  let envDef = new docusign.EnvelopeDefinition();

  //Set the Email Subject line and email message
  envDef.emailSubject = 'Please sign this document sent from RoboSitter';
  envDef.emailBlurb = 'Please sign this document sent from RoboSitter.'

  //Read the file from the document and convert it to a Base64String
  let doc = new docusign.Document();
  doc.documentBase64 = pdfBase64;
  doc.fileExtension = 'pdf';
  doc.name = 'Agreement and Waiver';
  doc.documentId = '1';

  //Push the doc to the documents array.
  let docs = [];
  docs.push(doc);
  envDef.documents = docs;

  //Create the signer with the previously provided name / email address
  let signer = new docusign.Signer();
  signer.name = recipientName;
  signer.email = recipientEmail;
  signer.routingOrder = '1';
  signer.recipientId = '1';
  signer.clientUserId = '123'; //ClientUserId specifies that a recipient is captive. It ties to a generic DocuSign account and cannot be referenced without generating a recipient token.

  //Create a tabs object and a signHere tab to be placed on the envelope
  let tabs = new docusign.Tabs();

  let signHere = new docusign.SignHere();
  signHere.documentId = '1';
  signHere.pageNumber = '1';
  signHere.recipientId = '1';
  signHere.tabLabel = 'SignHereTab';
  signHere.xPosition = '150';
  signHere.yPosition = '150';

  //Create the array for SignHere tabs, then add it to the general tab array
  signHereTabArray = [];
  signHereTabArray.push(signHere);

  tabs.signHereTabs = signHereTabArray;

  //Then set the recipient, named signer, tabs to the previously created tab array
  signer.tabs = tabs;

  //Add the signer to the signers array
  let signers = [];
  signers.push(signer);

  //Envelope status for drafts is created, set to sent if wanting to send the envelope right away
  envDef.status = 'sent';

  //Create the general recipients object, then set the signers to the signer array just created
  let recipients = new docusign.Recipients();
  recipients.signers = signers;

  //Then add the recipients object to the enevelope definitions
  envDef.recipients = recipients;
  
  // *** End envelope creation *** 

  //Send the envelope
  let envelopesApi = new docusign.EnvelopesApi();

  envelopesApi.createEnvelope(accountId, { 'envelopeDefinition': envDef }, function (err, envelopeSummary, response) {

    if (err) {
      return res.send('Error while creating a DocuSign envelope:' + err);
    }
    //Set envelopeId the envelopeId that was just created
    let envelopeId = envelopeSummary.envelopeId;

    //Fill out the recipient View request. authenticationMethod should be email. ClientUserId, RecipientId, returnUrl, userName (Full name of the signer), and email are required.
    //If a clientUserId was not specified, leave it out.
    let recipientViewRequest = new docusign.RecipientViewRequest();
    recipientViewRequest.authenticationMethod = 'email';
    recipientViewRequest.clientUserId = '123';
    recipientViewRequest.recipientId = '1';
    recipientViewRequest.returnUrl = `https://localhost:1989/keysetup/${recipientName}/${recipientEmail}`;
    recipientViewRequest.userName = recipientName;
    recipientViewRequest.email = recipientEmail;

    //Create the variable used to handle the response
    recipientViewResults = docusign.ViewLinkRequest();

    //Make the request for a recipient view
    envelopesApi.createRecipientView(accountId, envelopeId, { recipientViewRequest: recipientViewRequest }, function (err, recipientViewResults, response) {

      if (err) {
        return res.send('Error while creating a DocuSign recipient view:' + err);
      }

      //Set the signingUrl variable to the link returned from the CreateRecipientView request
      let signingUrl = recipientViewResults.url;

      //Then redirect to the signing URL
      res.redirect(signingUrl);
    });

  });

})

// identify who is currently watching
app.get('/who/admin', function(req, res) {
  addAdmin();
});

app.get('/', function (_req, res) {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.post('/register', function(req, res, next) {
  
  // Attempt to save the user's information.
  /*
  const result = db.addUser({
    name: req.query.name,
    email: req.query.email,
    password: req.query.password
  });
  */

 res.redirect(`/signdoc?name=${req.query.name}&email=${req.query.email}`);

});

app.listen(process.env.PORT || 8080, console.log("Listening on port 8080"));

https.createServer({
  key: fs.readFileSync('server.key'),
  cert: fs.readFileSync('server.cert')
}, app)
.listen(1989, function () {
  console.log('HTTPS listening on port 1989! Go to https://localhost:1989/')
})

var users = [{}];
var sessions = [{}];

const APP_ID = 'https://localhost:1989';
app.get('/api/register_req',(req, res)=>{
  var authRequest = u2f.request(APP_ID);
  var session = authRequest;
  app.set('session', session);
  res.send(session);
});

app.get('/api/sign_req', (req, res)=>{
  var authRequest = u2f.request(APP_ID, users[0].keyHandle);
  app.set('session', authRequest);
  res.send(JSON.stringify(authRequest));
});

app.post('/api/register', (req, res) =>{
  // console.log(req.body)
  var registration = u2f.checkRegistration(app.set('session'), req.body);
  console.log(registration);
  if(!registration.successful) {
    console.log(registration.errorMessage);
    return res.status(500).send({ message: "error" });
  }
  users[0].publicKey= res.publicKey;
  users[0].keyHandle = res.keyHandle;
  res.send(registration);
});


app.post('/api/authenticate', (req,res) =>{
  var publicKey = users[0].publicKey;
  var result = u2f.checkSignature(app.get('session'), req.body.authResponse, publicKey);
  if(result.successful){
    return sendStatus(200);
  } else {
    return res.send({result});
  }

});

