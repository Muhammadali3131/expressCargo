const { default: mongoose } = require("mongoose");
const CurrencyType = require("../schemas/CurrencyType");

const addCurrency = async (req, res) => {
  try {
    const { name, description } = req.body;

    const newCurrency = await CurrencyType.create({
      name,
      description,
    });
    res.status(201).send({ message: "New currency added", newCurrency });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Serverda xatolik" });
  }
};

const getAllCurrencys = async (req, res) => {
  try {
    const currency = await CurrencyType.find();
    res.status(200).send({ currency });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Serverda xatolik" });
  }
};

const getCurrencyById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).send({ error: "ID noto'g'ri kiritilgan" });
    }
    const currency = await CurrencyType.findById(id);
    if (!currency) {
      return res.status(404).send({ message: "Bunday currency topilmadi" });
    }
    res.status(200).send({ currency });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Serverda xatolik" });
  }
};

const getCurrencyByName = async (req, res) => {
  try {
    const { name } = req.body;
    const currency = await CurrencyType.findOne({
      name: { $regex: new RegExp(name, "i") },
    });
    res.status(200).send({ currency });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Serverda xatolik" });
  }
};

const deleteCurrencyById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).send({ error: "ID noto'g'ri kiritilgan" });
    }
    const currency = await CurrencyType.deleteOne({ _id: id });
    if (currency.deletedCount == 0) {
      return res.status(404).send({ message: "Bunday currency topilmadi" });
    }
    res.status(200).send({ message: "Currency o'chirildi" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Serverda xatolik" });
  }
};

const updateCurrencyById = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).send({ error: "ID noto'g'ri kiritilgan" });
    }

    const currency = await CurrencyType.updateOne(
      { _id: id },
      { name, description }
    );
    if (currency.matchedCount == 0) {
      return res.status(404).send({ message: "Bunday currency topilmadi" });
    }
    res.status(200).send({ message: "Currency o'zgartirildi" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Serverda xatolik" });
  }
};

module.exports = {
  addCurrency,
  getAllCurrencys,
  getCurrencyById,
  getCurrencyByName,
  deleteCurrencyById,
  updateCurrencyById,
};
