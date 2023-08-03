const mongoose = require("mongoose");





const User = mongoose.model('User', userSchema);
const Thought = mongoose.model('Thought', thoughtSchema);
const Reaction = mongoose.model('Reaction', reactionSchema);

const handleError = (err) => console.error(err);

User.create({
  username: "Ivy",
  email: "yeet@yeet.com"

})
User.create({
  username: "Andrew",
  email: "feet@feet.com"

})

Thought.create({
  thoughtText: "howdy, world",
  username: "Ivy"
});

Reaction.create({
  reactionID: "reaction01",
  reactionBody:"say hello",
  username: "Andrew"
})
  .then((result) => console.log("Created new document", result))
  .catch((err) => handleError(err));

module.exports = User, Thought, Reaction;
