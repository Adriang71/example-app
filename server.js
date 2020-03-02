const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const MongoClient = require('mongodb').MongoClient

let db;
// const uri = "mongodb+srv://admin:admin123123@event-mzyzg.mongodb.net/test?retryWrites=true&w=majority"; // Unsecure line of code, only for demo.
// const client = new MongoClient(uri, { useNewUrlParser: true });

// // Serve static files from the React app
// app.use(express.static(path.join(__dirname, 'client/build')));

// client.connect(err => {
//   if(err) return console.log(err);
//   db = client.db("eventsApp")
//   console.log(db)
//   console.log('Connect to MongoDB')
//   client.close();
// });

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
bodyParser.urlencoded({ extended: true})
app.use(bodyParser.json())
const root = require('path').join(__dirname, 'build')
app.use(express.static(root));

// Unsecure line of code, only for demo.
const uri = "mongodb+srv://admin:adminAdmin123123@event-mzyzg.mongodb.net/";

const client = new MongoClient(uri, { useNewUrlParser: true, });
client.connect(err => {
  db = client.db("eventsApp");
  // perform actions on the collection object
  // console.log(db)
  console.log(db.collection('events').find())
  const port = process.env.PORT || 5000;

  app.listen(port, () => {
    console.log(`Listning on ${port}`);
  });
});

// Put all API endpoints under '/api'

app.get('/api/events', (req, res) => {

  res.body('In');

  console.log(``);
});

app.post('/api/new/event', (req, res) => {
  console.log
  db.collection('events').insertOne(req.body, (err) => {
    if (err) return console.log(err)

    console.log('saved to database')
    res.status(200)
  })
});

app.get("*", (req, res) => {
  res.sendFile('index.html', { root });
})

