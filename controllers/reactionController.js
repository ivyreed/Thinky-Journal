const { ObjectId } = require("mongoose").Types;
const { User, Thought, Reaction } = require("../models");

const reactionController = {
  async getReaction(req, res) {
    try {
      const reactions = await Reaction.find();
      res.json(reactions);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Get a course
  async getSingleThought(req, res) {
    try {
      const reactions = await Reaction.findOne({
        _id: req.params.courseId,
      }).select("-__v");

      if (!reactions) {
        return res.status(404).json({ message: "No course with that ID" });
      }

      res.json(course);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Create a course
  async createThought(req, res) {
    try {
      const reactions = await Reaction.create(req.body);
      res.json(reactions);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  // Delete a course
  async deleteThought(req, res) {
    try {
      const reactions = await Reaction.findOneAndDelete({
        _id: req.params.courseId,
      });

      if (!reactions) {
        res.status(404).json({ message: "No course with that ID" });
      }

      await Student.deleteMany({ _id: { $in: course.students } });
      res.json({ message: "Course and students deleted!" });
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
