const {
  addAdmin,
  getAllAdmins,
  getAdminById,
  deleteAdminById,
  updateAdminById,
} = require("../controllers/admin.controller");

const router = require("express").Router();

router.post("/create", addAdmin);
router.get("/all", getAllAdmins);
router.get("/:id", getAdminById);
router.delete("/:id", deleteAdminById);
router.put("/:id", updateAdminById);

module.exports = router;
