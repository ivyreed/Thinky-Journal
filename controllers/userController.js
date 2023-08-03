const { ObjectId } = require("mongoose").Types;
const { User, Thought } = require("../models");
const userController = {
  async getUsers(req, res) {
    try {
      const users = await User.find();

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
      });

      if (!user) {
        return res.status(404).json({ message: "No user with that ID" });
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
  // Delete a student and remove them from the course
  //   deleteStudent(req, res) {
  //     try {
  //       const student = await Student.findOneAndRemove({
  //         _id: req.params.studentId,
  //       });

  //       if (!student) {
  //         return res.status(404).json({ message: "No such student exists" });
  //       }

  //       const course = await Course.findOneAndUpdate(
  //         { students: req.params.studentId },
  //         { $pull: { students: req.params.studentId } },
  //         { new: true }
  //       );

  //       if (!course) {
  //         return res.status(404).json({
  //           message: "Student deleted, but no courses found",
  //         });
  //       }

  //       res.json({ message: "Student successfully deleted" });
  //     } catch (err) {
  //       console.log(err);
  //       res.status(500).json(err);
  //     }
  //   }
};
module.exports = userController;
