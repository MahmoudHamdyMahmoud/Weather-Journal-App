// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');
// Start up an instance of app
const app = express();
/* Middleware*/
const bodyParser = require('body-parser');
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
const port = 8000;
const server = app.listen(port, () => {
  console.log(server);
  console.log(`running on localhost: ${port}`)
})

// GET Route to return projectData object
app.get('/getdata', (req, res) => {
  console.log('The server recieved a get request');
  res.send(projectData)
});

// POST Route to recieve three pieces of data
app.post('/postdata', (req, res) => {
  projectData = req.body;
  console.log(projectData);
  res.send(projectData);
});