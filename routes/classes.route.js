const express = require("express");

const router = express.Router();

// import controllers
const {
  getAllclassess,
  getSingleclasse,
  createclasses,
  updateclasses,
  deleteclasses,
} = require("../controllers/classes.controller");

const { body } = require("express-validator");

router
  .route("/")
  .get(getAllclassess)
  .post(
    body("price").notEmpty().withMessage("price is required"),
    createclasses
  );

router
  .route("/:classesId")
  .get(getSingleclasse)
  .patch(updateclasses)
  .delete(deleteclasses);

module.exports = router;
