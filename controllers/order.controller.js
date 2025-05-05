const { default: mongoose } = require("mongoose");
const Order = require("../schemas/Order");

const addOrder = async (req, res) => {
  try {
    const {
      order_unique_id,
      client_id,
      product_link,
      quantity,
      summa,
      currency_type_id,
      truck,
      description,
    } = req.body;

    const newOrder = await Order.create({
      order_unique_id,
      client_id,
      product_link,
      quantity,
      summa,
      currency_type_id,
      truck,
      description,
    });
    res.status(201).send({ message: "New order added", newOrder });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Serverda xatolik" });
  }
};

const getAllOrders = async (req, res) => {
  try {
    const order = await Order.find();
    res.status(200).send({ order });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Serverda xatolik" });
  }
};

const getOrderById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).send({ error: "ID noto'g'ri kiritilgan" });
    }
    const order = await Order.findById(id);
    if (!order) {
      return res.status(404).send({ message: "Bunday order topilmadi" });
    }
    res.status(200).send({ order });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Serverda xatolik" });
  }
};

const deleteOrderById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).send({ error: "ID noto'g'ri kiritilgan" });
    }
    const order = await Order.deleteOne({ _id: id });
    if (order.deletedCount == 0) {
      return res.status(404).send({ message: "Bunday order topilmadi" });
    }
    res.status(200).send({ message: "Order o'chirildi" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Serverda xatolik" });
  }
};

const updateOrderById = async (req, res) => {
  try {
    const { id } = req.params;
    const { order_unique_id,
      client_id,
      product_link,
      quantity,
      summa,
      currency_type_id,
      truck,
      description, } = req.body;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).send({ error: "ID noto'g'ri kiritilgan" });
    }

    const order = await Order.updateOne(
      { _id: id },
      { order_unique_id,
      client_id,
      product_link,
      quantity,
      summa,
      currency_type_id,
      truck,
      description, }
    );
    if (order.matchedCount == 0) {
      return res.status(404).send({ message: "Bunday order topilmadi" });
    }
    res.status(200).send({ message: "Order o'zgartirildi" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Serverda xatolik" });
  }
};

module.exports = {
  addOrder,
  getAllOrders,
  getOrderById,
  deleteOrderById,
  updateOrderById,
};
