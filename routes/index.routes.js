const router = require("express").Router()

const clientsRouter = require("./client.routes")
const currencyRouter = require("./currency.routes");
const orderRouter = require("./order.routes");
const adminRouter = require("./admin.routes");
const operationRouter = require("./operation.routes");
const statusRouter = require("./status.routes");

router.use("/client", clientsRouter)
router.use("/currency", currencyRouter);
router.use("/order", orderRouter);
router.use("/admin", adminRouter);
router.use("/operation", operationRouter);
router.use("/status", statusRouter);

module.exports = router