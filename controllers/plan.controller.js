const plan = require("../models/plan.model");
const { validationResult } = require("express-validator");
const { SUCCESS, FAILD, ERROR } = require("../utils/httpStatusText");
const asyncWrapper = require("../middleware/asyncWrapper");
const appError = require("../utils/appError");

const getAllplans = asyncWrapper(async (req, res) => {
  const query = req.query;
  const limit = query.limit || 10;
  const page = query.page || 1;
  const skip = (page - 1) * limit;
  const plans = await plan.find({}, { __v: false }).limit(limit).skip(skip);
  res.json({ status: SUCCESS, data: { plans } });
});

const getSingleplan = asyncWrapper(async (req, res) => {
  const plan = await plan.findById(req.params.planId);

  if (!plan) {
    const error = appError.create("not found plan", 404, ERROR);
    return next(error);
  }
  return res.json({ status: SUCCESS, data: { plan } });
});

const createplan = asyncWrapper(async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const error = appError.create(errors.array(), 400, FAILD);
    return next(error);
  }
  const newplan = new plan(req.body);

  await newplan.save();

  res.status(201).json({ status: SUCCESS, data: { plan: newplan } });
});

const updateplan = asyncWrapper(async (req, res) => {
  const planId = req.params.planId;
  const updatedplan = await plan.updateOne(
    { _id: planId },
    { $set: { ...req.body } }
  );
  return res.status(200).json({ status: SUCCESS, data: { plan: updatedplan } });
});

const deleteplan = async (req, res) => {
  await plan.deleteOne({ _id: req.params.planId });
  res.status(200).json({ status: SUCCESS, data: null });
};

module.exports = {
  getAllplans,
  getSingleplan,
  createplan,
  updateplan,
  deleteplan,
};
