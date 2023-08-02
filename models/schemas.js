// Define Mongoose
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true, trim: true},
  email: { type: String, required: true, unique: true, valid},
  thoughts: {'Array of _id values referencing the Thought mode'},
  friends: {'Array of _id values referencing the User model (self-reference)'}
});

const thoughtSchema = new mongoose.Schema({
  thoughtText: { type: String, required: true, minLength: 1, maxLength: 280},
  createdAt: { 'Date, Set default value to the current timestamp, Use a getter method to format the timestamp on query'},
  username: {type: String, required: true},
  reactions:{'Array of nested documents created with the reactionSchema'}

});

const reactionSchema = new mongoose.Schema({
  reactionID: { type: String, required: true, unique: true, trim: true},
  reactionBody: { type: String, required: true, unique: true, valid},
  username: { type: String, required: true},
  createdAt:{ type: Date, default: Date.now }

});
// Using mongoose.model() to compile a model based on the schema
// 'Item' is the name of the model
// grocerySchema is the name of the schema we are using to create a new instance of the model
const Item = mongoose.model("Item", grocerySchema);

// Error handler function to be called when an error occurs when trying to save a document
const handleError = (err) => console.error(err);

// We use the model to create individual documents that have the properties as defined in our schema
Item.create({
  item: "banana",
  stockCount: 10,
  price: 1,
  inStock: true,
})
  .then((result) => console.log("Created new document", result))
  .catch((err) => handleError(err));

module.exports = Item;
