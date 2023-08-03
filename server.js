const express = require("express");


const connection = require("./config/connection.js")

// const { User, Thought, Reaction } = require("./models");
// const { Thought } = require("./models");
// const { Reaction } = require("./models");

const app = express();
const PORT = process.env.PORT || 3001;
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(require("./routes"));

// const { MongoClient } = require("mongodb");
// const connectionStringURI = `mongodb://127.0.0.1:27017`;
// const client = new MongoClient(connectionStringURI);

// let db;

const dbName = "thinkyjournalDB";
// async function connectDB() {
//   try {

// client
//     .connect()
//     .then(() => {
//       console.log("Connected successfully to MongoDB");
//       db = client.db(dbName);
//       app.listen(PORT, () => {
//         console.log(`Example app listening at http://localhost:${PORT}`);
//       });
//     })
//     .catch((err) => {
//       console.error("Mongo connection error: ", err.message);
//     });
  //   } catch (error) {
  //     console.error("try connection error: ", error);
  //   }
  // }
  // connectDB();

  //     from assignment 7
  //   async function seedDBAndStartServer() {
  //     try {
  //       await client.connect();
  //       console.log("Connected successfully to MongoDB");
  //       db = client.db(dbName);
  //       // Drops any documents, if they exist
  //       await db.collection("groceryList").deleteMany({});
  //       // Adds data to database
  //       const res = await db.collection("groceryList").insertMany(data);
  //       console.log(res);

  //       app.listen(port, () => {
  //         console.log(`Example app listening at http://localhost:${port}`);
  //       });
  //     } catch (err) {
  //       console.error("Mongo connection error: ", err.message);
  //     }
  //   }
  //   seedDBAndStartServer();
  // Built in Express function that parses incoming requests to JSON

  // app.get("/all-users", async (req, res) => {
  //   try {
  //     // Using model in route
  //     const result = await User.find({});
  //     res.status(200).json(result);
  //   } catch (err) {
  //     res.status(500).send({ message: "Internal Server Error, USER GET ROUTE" });
  //   }
  // });

  // app.get("/all-thoughts", async (req, res) => {
  //   try {
  //     // Using model in route
  //     const result = await Thought.find({});
  //     res.status(200).json(result);
  //   } catch (err) {
  //     res.status(500).send({ message: "Internal Server Error, THOUGHT GET ROUTE" });
  //   }
  // });

  // app.get("/all-reactions", async (req, res) => {
  //   try {
  //     // Using model in route
  //     const result = await Reaction.find({});
  //     res.status(200).json(result);
  //   } catch (err) {
  //     res.status(500).send({ message: "Internal Server Error, REACTIONS GET ROUTE" });
  //   }
  // });

  // app.post("/create", (req, res) => {
  //   db.collection("userStorage")
  //     .insertOne({ name: req.body.name, email: req.body.email, thoughts: req.body.thoughts })
  //     .then((results) => res.json(results))
  //     .catch((err) => {
  //       if (err) throw err;
  //     });
  // });

  // app.get("/read", (req, res) => {
  //   db.collection("userStorage")
  //     .find()
  //     .toArray()
  //     .then((results) => res.json(results))
  //     .catch((err) => {
  //       if (err) throw err;
  //     });
  // });

  // app.delete("/delete", (req, res) => {
  //   const humanId = new ObjectId(req.body.id);

  //   db.collection("userCollection")
  //     .deleteOne(
  //       { _id: humanId }
  //     )
  //     .then((results) => {
  //       console.log(results);
  //       res.send(
  //         results.deletedCount ? "Thou parcel hath been returned to the fire from which it came" : "I say! No parcel hath been discovered!"
  //       );
  //     })
  //     .catch((err) => {
  //       if (err) throw err;
  //     });
  // });
// console.log(db)
  connection.once("open", () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
    });
  });
