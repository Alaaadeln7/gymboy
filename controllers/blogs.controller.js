const Blog = require("../models/blog.model");
const { validationResult } = require("express-validator");
const { SUCCESS, FAILD, ERROR } = require("../utils/httpStatusText");
const asyncWrapper = require("../middleware/asyncWrapper");
const appError = require("../utils/appError");

const getAllBlogs = asyncWrapper(async (req, res) => {
  const query = req.query;
  const limit = query.limit || 10;
  const page = query.page || 1;
  const skip = (page - 1) * limit;
  const blogs = await Blog.find({}, { __v: false }).limit(limit).skip(skip);
  res.json({ status: SUCCESS, data: { blogs } });
});

const getSingleBlog = asyncWrapper(async (req, res) => {
  const blog = await Blog.findById(req.params.blogId);

  if (!blog) {
    const error = appError.create("not found Blog", 404, ERROR);
    return next(error);
  }
  return res.json({ status: SUCCESS, data: { blog } });
});

const createBlog = asyncWrapper(async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const error = appError.create(errors.array(), 400, FAILD);
    return next(error);
  }
  const newBlog = new Blog(req.body);

  await newBlog.save();

  res.status(201).json({ status: SUCCESS, data: { blog: newBlog } });
});

const updateBlog = asyncWrapper(async (req, res) => {
  const blogId = req.params.blogId;
  const updatedBlog = await Blog.updateOne(
    { _id: blogId },
    { $set: { ...req.body } }
  );
  return res.status(200).json({ status: SUCCESS, data: { blog: updatedBlog } });
});

const deleteBlog = async (req, res) => {
  await Blog.deleteOne({ _id: req.params.blogId });
  res.status(200).json({ status: SUCCESS, data: null });
};

module.exports = {
  getAllBlogs,
  getSingleBlog,
  createBlog,
  updateBlog,
  deleteBlog,
};
