const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const MongoClient = require('mongodb').MongoClient

let db;

const root = require('path').join(__dirname, 'build')
app.use(express.static(root));

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json())

// Unsecure line of code, only for demo.
const uri = "mongodb+srv://admin:adminAdmin123123@event-mzyzg.mongodb.net/";

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  if(err) return console.log(err)
  db = client.db("eventsApp");
  const port = process.env.PORT || 5000;

  app.listen(port, () => {
    console.log(`Listning on ${port}`);
  });
});

// Put all API endpoints under '/api'

app.get('/api/events', (req, res) => {

  res.body('In');

  return res.send(200)
});

app.post('/api/new/event', (req, res) => {
  console.log(req.body)
  db.collection('events').insertOne(req.body, (err) => {
    if (err) return console.log(err)

    console.log('saved to database')
  })
  return res.send('Saved to database')
});

app.get("*", (req, res) => {
  res.sendFile('index.html', { root });
})

