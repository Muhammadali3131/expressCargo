const { default: mongoose } = require("mongoose");
const Admin = require("../schemas/Admins");
const { sendErrorResponse } = require("../helpers/send_error_response");

const addAdmin = async (req, res) => {
  try {
    const {
      full_name,
      user_name,
      password,
      phone_number,
      email,
      is_creator,
      is_active,
      description,
    } = req.body;

    const newAdmin = await Admin.create({
      full_name,
      user_name,
      password,
      phone_number,
      email,
      is_creator,
      is_active,
      description,
    });
    res.status(201).send({ message: "New admin added", newAdmin });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const getAllAdmins = async (req, res) => {
  try {
    const admins = await Admin.find();
    res.status(200).send({ admins });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const getAdminById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).send({ error: "ID noto'g'ri kiritilgan" });
    }
    const admin = await Admin.findById(id);
    if (!admin) {
      return res.status(404).send({ message: "Bunday admin topilmadi" });
    }
    res.status(200).send({ admin });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const deleteAdminById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).send({ error: "ID noto'g'ri kiritilgan" });
    }
    const admin = await Admin.deleteOne({ _id: id });
    if (admin.deletedCount == 0) {
      return res.status(404).send({ message: "Bunday admin topilmadi" });
    }
    res.status(200).send({ message: "Admin o'chirildi" });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const updateAdminById = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      full_name,
      user_name,
      password,
      phone_number,
      email,
      is_creator,
      is_active,
      description,
    } = req.body;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).send({ error: "ID noto'g'ri kiritilgan" });
    }

    const admin = await Admin.updateOne(
      { _id: id },
      {
        full_name,
        user_name,
        password,
        phone_number,
        email,
        is_creator,
        is_active,
        description,
      }
    );
    if (admin.matchedCount == 0) {
      return res.status(404).send({ message: "Bunday admin topilmadi" });
    }
    res.status(200).send({ message: "Admin o'zgartirildi" });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

module.exports = {
  addAdmin,
  getAllAdmins,
  getAdminById,
  deleteAdminById,
  updateAdminById,
};
