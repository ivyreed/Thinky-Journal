const { User, Thought } = require("../models");

const thoughtController = {
  async getAllThoughts(req, res) {
    try {
      const thoughts = await Thought.find();
      res.json(thoughts);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async getSingleThought(req, res) {
    try {
      const thoughtData = await Thought.findOne({ _id: req.params.id })
        .populate({
          path: "reactions",
          select: "-__v",
        })
        .select("-__v");

      if (!thoughtData) {
        return res.status(404).json({ message: "No thought with this ID!" });
      }

      res.json(thoughtData);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  async createThought(req, res) {
    try {
      const thought = await Thought.create(req.body);
      // console.log("New thought created:", thought);

      const user = await User.findOneAndUpdate(
        { username: req.body.username },
        { $push: { thoughts: thought._id } },
        { new: true }
      );

      if (!user) {
        return res.status(404).json({ message: "cannot find user" });
      }

      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async deleteThought(req, res) {
    try {
      const thoughtData = await Thought.findOneAndDelete({
        _id: req.params.id,
      });

      if (!thoughtData) {
        return res.status(404).json({ message: "No thought with that ID" });
      }

      res.json(thoughtData);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async updateThought(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.id },
        { $set: req.body },
        { new: true, runValidators: true }
      );

      if (!thought) {
        res.status(404).json({ message: "cannot find thought" });
        return;
      }

      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async addReaction(req, res) {
    try {
      const thoughtData = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $addToSet: { reactions: req.body } },
        { new: true, runValidators: true }
      );

      if (!thoughtData) {
        res.status(404).json({ message: "No reaction made" });
        return;
      }

      res.json(thoughtData);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async deleteReaction(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $pull: { reactions: { _id: req.params.reactionId } } },
        { new: true }
      );

      if (!thought) {
        res.status(404).json({ message: "No reaction found" });
        return;
      }

      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
module.exports = thoughtController;
