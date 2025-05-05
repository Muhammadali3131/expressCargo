const {
  addOrder,
  getAllOrders,
  getOrderById,
  deleteOrderById,
  updateOrderById,
} = require("../controllers/order.controller");

const router = require("express").Router();

router.post("/create", addOrder);
router.get("/all", getAllOrders);
router.get("/:id", getOrderById);
router.delete("/:id", deleteOrderById);
router.put("/:id", updateOrderById);

module.exports = router;
