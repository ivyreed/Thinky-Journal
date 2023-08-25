const { User, Thought } = require("../models");

const thoughtController = {
  //   async getThoughts(req, res) {
  //     try {
  //       const thoughts = await Thought.find();
  //       res.json(thoughts);
  //     } catch (err) {
  //       res.status(500).json(err);
  //     }
  //   },
  async getThoughts(req, res) {
    try {
      const thoughts = await Thought.find({}).populate({
        // path: "reactions",
        select: "-__v",
      });

      if (!thoughts) {
        res.status(404).json({ message: "No thoughts available" });
        return;
      }

      res.json(thoughts);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  //   // Get a course
  //   async getSingleThought(req, res) {
  //     try {
  //       const thoughts = await Thought.findOne({
  //         _id: req.params.courseId,
  //       }).select("-__v");

  //       if (!thoughts) {
  //         return res.status(404).json({ message: "No course with that ID" });
  //       }

  //       res.json(course);
  //     } catch (err) {
  //       res.status(500).json(err);
  //     }
  //   },
  async getSingleThought(req, res) {
    try {
      const thought = await Thought.findOne({ _id: req.params.id })
        .populate({
          // path: "reactions",
          select: "-__v",
        })
        .select("-__v");

      if (!thought) {
        return res.status(404).json({ message: "incorrect thought id" });
      }

      res.json(thought);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  //   async createThought(req, res) {
  //     try {
  //       const thoughts = await Thought.create(req.body);
  //       if (!thoughts) {
  //         return res.status(500).json({ msg: "failed mongo create function" });
  //       } else {
  //         const updatedUser = await User.findOneAndUpdate(
  //           { username: thoughts.username },
  //           { $push: { thoughts: thoughts } },
  //           { new: true, runValidators: true }
  //         );
  //         res.json({ thoughts, updatedUser });
  //       }
  //     } catch (err) {
  //       console.log(err);
  //       return res.status(500).json(err);
  //     }
  //   },
  async createThought(req, res) {
    try {
      const thought = await Thought.create(req.body);
      // console.log("New thought created:", thought);

      const user = await User.findOneAndUpdate(
        { _id: req.body.userId },
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

  //   async deleteThought(req, res) {
  //     try {
  //       const thoughts = await Thought.findOneAndDelete({
  //         _id: req.params.courseId,
  //       });

  //       if (!course) {
  //         res.status(404).json({ message: "No course with that ID" });
  //       }

  //       await Student.deleteMany({ _id: { $in: course.students } });
  //       res.json({ message: "Course and students deleted!" });
  //     } catch (err) {
  //       res.status(500).json(err);
  //     }
  //   },

  async deleteThought(req, res) {
    try {
      const thought = await Thought.findOneAndDelete({
        _id: req.params.id,
      });

      if (!thought) {
        return res.status(404).json({ message: "No thought with that ID" });
      }

      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Retrieve a thought by id

  // Create a thought

  async addReaction(req, res) {
    try {
      const thoughtData = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $addToSet: { reactions: req.body } },
        { new: true, runValidators: true }
      );

      if (!thoughtData) {
        res.status(404).json({ message: "No reaction created!" });
        return;
      }

      res.json(thoughtData);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async deleteReaction(req, res) {
    try {
      const thoughtData = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $pull: { reactions: { _id: req.params.reactionId } } },
        { new: true }
      );

      if (!thoughtData) {
        res.status(404).json({ message: "No reaction found with this id!" });
        return;
      }

      res.json(thoughtData);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
module.exports = thoughtController;

