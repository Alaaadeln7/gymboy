const classes = require("../models/classes.model");
const { validationResult } = require("express-validator");
const { SUCCESS, FAILD, ERROR } = require("../utils/httpStatusText");
const asyncWrapper = require("../middleware/asyncWrapper");
const appError = require("../utils/appError");

const getAllclassess = asyncWrapper(async (req, res) => {
  const query = req.query;
  const limit = query.limit || 10;
  const page = query.page || 1;
  const skip = (page - 1) * limit;
  const classess = await classes
    .find({}, { __v: false })
    .limit(limit)
    .skip(skip);
  res.json({ status: SUCCESS, data: { classess } });
});

const getSingleclasse = asyncWrapper(async (req, res, next) => {
  const classe = await classes.findById(req.params.classesId);
  if (!classe) {
    const error = appError.create("not found classes", 404, ERROR);
    return next(error);
  }
  return res.json({ status: SUCCESS, data: { classe } });
});

const createclasses = asyncWrapper(async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const error = appError.create(errors.array(), 400, FAILD);
    return next(error);
  }
  const newclasses = new classes(req.body);

  await newclasses.save();

  res.status(201).json({ status: SUCCESS, data: { classes: newclasses } });
});

const updateclasses = asyncWrapper(async (req, res) => {
  const classesId = req.params.classesId;
  const updatedclasses = await classes.updateOne(
    { _id: classesId },
    { $set: { ...req.body } }
  );
  return res
    .status(200)
    .json({ status: SUCCESS, data: { classes: updatedclasses } });
});

const deleteclasses = async (req, res) => {
  await classes.deleteOne({ _id: req.params.classesId });
  res.status(200).json({ status: SUCCESS, data: null });
};

module.exports = {
  getAllclassess,
  getSingleclasse,
  createclasses,
  updateclasses,
  deleteclasses,
};
