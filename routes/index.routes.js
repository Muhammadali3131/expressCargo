const router = require("express").Router()

const clientsRouter = require("./client.routes")
const currencyRouter = require("./currency.routes");
const orderRouter = require("./order.routes");

router.use("/client", clientsRouter)
router.use("/currency", currencyRouter);
router.use("/order", orderRouter);

module.exports = router