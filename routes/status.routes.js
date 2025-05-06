const {
  addStatus,
  getAllStatuses,
  getStatusById,
  deleteStatusById,
  updateStatusById,
} = require("../controllers/status.controller");

const router = require("express").Router();

router.post("/create", addStatus);
router.get("/all", getAllStatuses);
router.get("/:id", getStatusById);
router.delete("/:id", deleteStatusById);
router.put("/:id", updateStatusById);

module.exports = router;
