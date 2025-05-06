const { default: mongoose } = require("mongoose");
const Operation = require("../schemas/Operation");
const { sendErrorResponse } = require("../helpers/send_error_response");

const addOperation = async (req, res) => {
  try {
    const { order_id, status_id, operation_date, admin_id, description } =
      req.body;

    const newOperation = await Operation.create({
      order_id,
      status_id,
      operation_date,
      admin_id,
      description,
    });
    res.status(201).send({ message: "New operation added", newOperation });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const getAllOperations = async (req, res) => {
  try {
    const operations = await Operation.find()
      .populate({
        path: "order_id",
        select: "order_unique_id-_id",
      })
      .populate({
        path: "status_id",
        select: "name-_id",
      })
      .populate({
        path: "admin_id",
        select: "full_name-_id",
      });
    res.status(200).send({ operations });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const getOperationById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).send({ error: "ID noto'g'ri kiritilgan" });
    }
    const operation = await Operation.findById(id)
      .populate({
        path: "order_id",
        select: "order_unique_id-_id",
      })
      .populate({
        path: "status_id",
        select: "name-_id",
      })
      .populate({
        path: "admin_id",
        select: "full_name-_id",
      });
    if (!operation) {
      return res.status(404).send({ message: "Bunday operation topilmadi" });
    }
    res.status(200).send({ operation });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const deleteOperationById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).send({ error: "ID noto'g'ri kiritilgan" });
    }
    const operation = await Operation.deleteOne({ _id: id });
    if (operation.deletedCount == 0) {
      return res.status(404).send({ message: "Bunday operation topilmadi" });
    }
    res.status(200).send({ message: "Operation o'chirildi" });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const updateOperationById = async (req, res) => {
  try {
    const { id } = req.params;
    const { order_id, status_id, operation_date, admin_id, description } =
      req.body;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).send({ error: "ID noto'g'ri kiritilgan" });
    }

    const operation = await Operation.updateOne(
      { _id: id },
      {
        order_id,
        status_id,
        operation_date,
        admin_id,
        description,
      }
    );
    if (operation.matchedCount == 0) {
      return res.status(404).send({ message: "Bunday operation topilmadi" });
    }
    res.status(200).send({ message: "Operation o'zgartirildi" });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

module.exports = {
  addOperation,
  getAllOperations,
  getOperationById,
  deleteOperationById,
  updateOperationById,
};
