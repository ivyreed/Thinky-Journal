const express = require("express");
// Run npm install mongodb and require mongodb and MongoClient class
const { MongoClient } = require("mongodb");

const app = express();
const port = 3333;

// Connection string to local instance of MongoDB
const connectionStringURI = `mongodb://127.0.0.1:27017`;

// Initialize a new instance of MongoClient
const client = new MongoClient(connectionStringURI);

// Declare a variable to hold the connection
let db;

// Create variable to hold our database name
const dbName = "thinkyjournalDB";

client
  .connect()
  .then(() => {
    console.log("Connected successfully to MongoDB");
    // Use client.db() constructor to add new db instance
    db = client.db(dbName);

    // start up express server
    app.listen(port, () => {
      console.log(`Example app listening at http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error("Mongo connection error: ", err.message);
  });

// Built in Express function that parses incoming requests to JSON
app.use(express.json());

app.post("/create", (req, res) => {
  // Use db connection to add a document
  db.collection("HumanStorage")
    .insertOne({ name: req.body.name, email: req.body.email })
    .then((results) => res.json(results))
    .catch((err) => {
      if (err) throw err;
    });
});

app.get("/read", (req, res) => {
  // Use db connection to find all documents in collection
  db.collection("HumanStorage")
    .find()
    .toArray()
    .then((results) => res.json(results))
    .catch((err) => {
      if (err) throw err;
    });
});

// To delete a document, we need to convert the string id in body to an ObjectId
app.delete("/delete", (req, res) => {
  // Wrap the id in the ObjectId class to instantiate a new instance
  const bookId = new ObjectId(req.body.id);

  // Use deleteOne() to delete one object
  db.collection("bookCollection")
    .deleteOne(
      // This is the filter. We delete only the document that matches the _id provided in the request body.
      { _id: bookId }
    )
    .then((results) => {
      console.log(results);
      res.send(
        results.deletedCount ? "Document deleted" : "No document found!"
      );
    })
    .catch((err) => {
      if (err) throw err;
    });
});
