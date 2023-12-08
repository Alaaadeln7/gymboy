const express = require("express");

const router = express.Router();

// import controllers
const {
  getAllplans,
  getSingleplan,
  createplan,
  updateplan,
  deleteplan,
} = require("../controllers/plan.controller");

const { body } = require("express-validator");

router
  .route("/")
  .get(getAllplans)
  .post(
    body("title")
      .notEmpty()
      .withMessage("title is required")
      .isLength({ min: 2 })
      .withMessage("characters smaller than 2"),
    body("price").notEmpty().withMessage("price is required"),
    createplan
  );

router
  .route("/:planId")
  .get(getSingleplan)
  .patch(updateplan)
  .delete(deleteplan);

module.exports = router;
