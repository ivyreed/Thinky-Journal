const express = require("express");
// Run npm install mongodb and require mongodb and MongoClient class
const { MongoClient } = require("mongodb");

const app = express();
const PORT = process.env.PORT || 3001;

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
    .insertOne({ name: req.body.name, email: req.body.email, thoughts: req.body.thoughts })
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
  const humanId = new ObjectId(req.body.id);

  // Use deleteOne() to delete one object
  db.collection("HumanCollection")
    .deleteOne(
      // This is the filter. We delete only the document that matches the _id provided in the request body.
      { _id: humanId }
    )
    .then((results) => {
      console.log(results);
      res.send(
        results.deletedCount ? "Thou parcel hath been returned to the fire from which it came" : "I say! No parcel hath been discovered!"
      );
    })
    .catch((err) => {
      if (err) throw err;
    });
});


db.once("open", () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
  });
});