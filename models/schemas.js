// Define Mongoose
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true, trim: true},
  email: { type: String, required: true, unique: true, valid},
  // thoughts: {'Array of _id values referencing the Thought mode'},
  // friends: {'Array of _id values referencing the User model (self-reference)'}
});

const thoughtSchema = new mongoose.Schema({
  thoughtText: { type: String, required: true, minLength: 1, maxLength: 280},
  createdAt: { type: Date, default: Date.now },
  username: {type: String, required: true},
  // reactions:{'Array of nested documents created with the reactionSchema'}

});

const reactionSchema = new mongoose.Schema({
  reactionID: { type: String, required: true, unique: true, trim: true},
  reactionBody: { type: String, required: true, unique: true, valid},
  username: { type: String, required: true},
  createdAt:{ type: Date, default: Date.now }

});

const User = mongoose.model('User', userSchema);
const Thought = mongoose.model('Thought', thoughtSchema);
const Reaction = mongoose.model('Reaction', reactionSchema);

// Error handler function to be called when an error occurs when trying to save a document
const handleError = (err) => console.error(err);

// We use the model to create individual documents that have the properties as defined in our schema
User.create({
  username: "Ivy",
  email: "yeet@yeet.com",

})
User.create({
  username: "Andrew",
  email: "feet@feet.com",

})

Thought.create({
  thoughtText: "howdy, world",
  username: "Ivy",
});

Reaction.create({
  reactionID: "reaction01",
  reactionBody:"say hello"
  username: "Andrew",
})
  .then((result) => console.log("Created new document", result))
  .catch((err) => handleError(err));

module.exports = User, Thought, Reaction;
