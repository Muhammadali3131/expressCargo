const { default: mongoose } = require("mongoose");
const Status = require("../schemas/Status");
const { sendErrorResponse } = require("../helpers/send_error_response");

const addStatus = async (req, res) => {
  try {
    const { name, description } = req.body;

    const newStatus = await Status.create({ name, description });
    res.status(201).send({ message: "New status added", newStatus });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const getAllStatuses = async (req, res) => {
  try {
    const statuss = await Status.find();
    res.status(200).send({ statuss });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const getStatusById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).send({ error: "ID noto'g'ri kiritilgan" });
    }
    const status = await Status.findById(id);
    if (!status) {
      return res.status(404).send({ message: "Bunday status topilmadi" });
    }
    res.status(200).send({ status });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const deleteStatusById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).send({ error: "ID noto'g'ri kiritilgan" });
    }
    const status = await Status.deleteOne({ _id: id });
    if (status.deletedCount == 0) {
      return res.status(404).send({ message: "Bunday status topilmadi" });
    }
    res.status(200).send({ message: "Status o'chirildi" });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const updateStatusById = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).send({ error: "ID noto'g'ri kiritilgan" });
    }

    const status = await Status.updateOne({ _id: id }, { name, description });
    if (status.matchedCount == 0) {
      return res.status(404).send({ message: "Bunday status topilmadi" });
    }
    res.status(200).send({ message: "Status o'zgartirildi" });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

module.exports = {
  addStatus,
  getAllStatuses,
  getStatusById,
  deleteStatusById,
  updateStatusById,
};
