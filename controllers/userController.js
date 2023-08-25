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
  // Get a single student
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
  // create a new student
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
      const updatedUser = await User.deleteOne({ _id: req.params.userId });
      if (!updatedUser) {
        res.json({ msg: "user not found" });
      }
      await Thought.deleteMany({ _id: { $in: updatedUser.thoughts } });
      res.json(updatedUser);
    } catch (error) {
      res.json({ msg: "failed delete user route" });
    }
  },
  // deleteUser(req, res) {
  //   try {
  //     const users = await User.findOneAndRemove({
  //       _id: req.params.studentId,
  //     });

  //     if (!users) {
  //       return res.status(404).json({ message: "No such student exists" });
  //     }

  // const course = await Course.findOneAndUpdate(
  //   { students: req.params.studentId },
  //   { $pull: { students: req.params.studentId } },
  //   { new: true }
  // );

  //     if (!course) {
  //       return res.status(404).json({
  //         message: "Student deleted, but no courses found",
  //       });
  //     }

  //     res.json({ message: "Student successfully deleted" });
  //   } catch (err) {
  //     console.log(err);
  //     res.status(500).json(err);
  //   }
  // }
};
module.exports = userController;
