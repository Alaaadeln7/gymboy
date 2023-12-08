const express = require("express");

const router = express.Router();

// import controllers
const {
  getAllBlogs,
  getSingleBlog,
  createBlog,
  updateBlog,
  deleteBlog,
} = require("../controllers/blogs.controller");

const { body } = require("express-validator");

router
  .route("/")
  .get(getAllBlogs)
  .post(
    body("title")
      .notEmpty()
      .withMessage("title is required")
      .isLength({ min: 2 })
      .withMessage("characters smaller than 2"),
    body("description")
      .notEmpty()
      .withMessage("description is required")
      .isLength({ min: 10 })
      .withMessage("characters smaller than 10"),
    createBlog
  );

router
  .route("/:blogId")
  .get(getSingleBlog)
  .patch(updateBlog)
  .delete(deleteBlog);

module.exports = router;
