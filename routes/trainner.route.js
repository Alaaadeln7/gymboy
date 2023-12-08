const express = require("express");

const router = express.Router();

// import controllers
const {
  getAlltrainners,
  getSingletrainner,
  createtrainner,
  updatetrainner,
  deletetrainner,
} = require("../controllers/trainner.controller");

const { body } = require("express-validator");

router.route("/").get(getAlltrainners).post(createtrainner);

router
  .route("/:productId")
  .get(getSingletrainner)
  .patch(updatetrainner)
  .delete(deletetrainner);

module.exports = router;
