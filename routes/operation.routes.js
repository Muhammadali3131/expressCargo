const {
  addOperation,
  getAllOperations,
  getOperationById,
  deleteOperationById,
  updateOperationById,
} = require("../controllers/operation.controller");

const router = require("express").Router();

router.post("/create", addOperation);
router.get("/all", getAllOperations);
router.get("/:id", getOperationById);
router.delete("/:id", deleteOperationById);
router.put("/:id", updateOperationById);

module.exports = router;
