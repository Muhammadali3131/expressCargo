const { default: mongoose } = require("mongoose");
const Client = require("../schemas/Client");

const addClient = async (req, res) => {
  try {
    const { full_name, phone_number, address, location, email } = req.body;

    const newClient = await Client.create({
      full_name,
      phone_number,
      address,
      location,
      email,
    });
    res.status(201).send({ message: "New client added", newClient });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Serverda xatolik" });
  }
};

const getAllClients = async (req, res) => {
  try {
    const clients = await Client.find();
    res.status(200).send({ clients });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Serverda xatolik" });
  }
};

const getClientById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).send({ error: "ID noto'g'ri kiritilgan" });
    }
    const client = await Client.findById(id);
    if (!client) {
      return res.status(404).send({ message: "Bunday client topilmadi" });
    }
    res.status(200).send({ client });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Serverda xatolik" });
  }
};

const getClientByName = async (req, res) => {
  try {
    const { first_name } = req.body;
    const client = await Client.findOne({
      first_name: { $regex: new RegExp(first_name, "i") },
    });
    res.status(200).send({ client });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Serverda xatolik" });
  }
};

const deleteClientById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).send({ error: "ID noto'g'ri kiritilgan" });
    }
    const client = await Client.deleteOne({ _id: id });
    if (client.deletedCount == 0) {
      return res.status(404).send({ message: "Bunday client topilmadi" });
    }
    res.status(200).send({ message: "Client o'chirildi" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Serverda xatolik" });
  }
};

const updateClientById = async (req, res) => {
  try {
    const { id } = req.params;
    const { full_name, phone_number, address, location, email } = req.body;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).send({ error: "ID noto'g'ri kiritilgan" });
    }

    const client = await Client.updateOne(
      { _id: id },
      { full_name, phone_number, address, location, email }
    );
    if (client.matchedCount == 0) {
      return res.status(404).send({ message: "Bunday client topilmadi" });
    }
    res.status(200).send({ message: "Client o'zgartirildi" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Serverda xatolik" });
  }
};

module.exports = {
  addClient,
  getAllClients,
  getClientById,
  getClientByName,
  deleteClientById,
  updateClientById,
};
