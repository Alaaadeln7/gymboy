const trainner = require("../models/trainner.model");
const { validationResult } = require("express-validator");
const { SUCCESS, FAILD, ERROR } = require("../utils/httpStatusText");
const asyncWrapper = require("../middleware/asyncWrapper");
const appError = require("../utils/appError");

const getAlltrainners = asyncWrapper(async (req, res) => {
  const query = req.query;
  const limit = query.limit || 10;
  const page = query.page || 1;
  const skip = (page - 1) * limit;
  const trainners = await trainner
    .find({}, { __v: false })
    .limit(limit)
    .skip(skip);
  res.json({ status: SUCCESS, data: { trainners } });
});

const getSingletrainner = asyncWrapper(async (req, res) => {
  const trainner = await trainner.findById(req.params.trainnerId);

  if (!trainner) {
    const error = appError.create("not found trainner", 404, ERROR);
    return next(error);
  }
  return res.json({ status: SUCCESS, data: { trainner } });
});

const createtrainner = asyncWrapper(async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const error = appError.create(errors.array(), 400, FAILD);
    return next(error);
  }
  const newtrainner = new trainner(req.body);

  await newtrainner.save();

  res.status(201).json({ status: SUCCESS, data: { trainner: newtrainner } });
});

const updatetrainner = asyncWrapper(async (req, res) => {
  const trainnerId = req.params.trainnerId;
  const updatedtrainner = await trainner.updateOne(
    { _id: trainnerId },
    { $set: { ...req.body } }
  );
  return res
    .status(200)
    .json({ status: SUCCESS, data: { trainner: updatedtrainner } });
});

const deletetrainner = async (req, res) => {
  await trainner.deleteOne({ _id: req.params.trainnerId });
  res.status(200).json({ status: SUCCESS, data: null });
};

module.exports = {
  getAlltrainners,
  getSingletrainner,
  createtrainner,
  updatetrainner,
  deletetrainner,
};
