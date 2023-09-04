const { User, Thought } = require("../models");
const userController = {
  async getUsers(req, res) {
    try {
      const users = await User.find().populate("thoughts");

      res.json(users);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },

  async getSingleUser(req, res) {
    try {
      const user = await User.findOne({
        _id: req.params.userId,
      })
        .populate("thoughts")
        .populate("friends");

      if (!user) {
        return res.status(404).json({ message: "failed single user route" });
      }

      res.json({
        user,
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },

  async createUser(req, res) {
    try {
      const user = await User.create(req.body);
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async deleteUser(req, res) {
    try {
      const user = await User.findOneAndDelete({
        _id: req.params.userId,
      })
        .populate("thoughts")
        .populate("friends");

      if (!user) {
        return res.status(404).json({ message: "failed single user route" });
      }

      res.json({
        user,
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },

  async updateUser(req, res) {
    try {
      const userData = await User.findOneAndUpdate(
        { _id: req.params.id },
        { $set: req.body },
      );

      if (!userData) {
        res.status(404).json({ message: "No user with this id!" });
        return;
      }

      res.json(userData);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
module.exports = userController;
