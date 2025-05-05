const {
  addClient,
  getAllClients,
  getClientById,
  getClientByName,
  deleteClientById,
  updateClientById,
} = require("../controllers/client.controller");

const router = require("express").Router();

router.post("/create", addClient);
router.get("/all", getAllClients);
router.get("/name", getClientByName);
router.get("/:id", getClientById);
router.delete("/:id", deleteClientById);
router.put("/:id", updateClientById);

module.exports = router;
