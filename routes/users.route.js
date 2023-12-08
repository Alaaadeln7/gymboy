const express = require("express");

const router = express.Router();

// import controllers
const {
  getAllUsers,
  getSingleUser,
  register,
  login,
  logout,
  updateUser,
} = require("../controllers/users.controller");

router.route("/").get(getAllUsers);

router.route("/:userId").get(getSingleUser).delete(logout).patch(updateUser);

router.route("/register").post(register);

router.route("/login").post(login);

module.exports = router;
