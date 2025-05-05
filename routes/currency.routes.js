const {
  addCurrency,
  getAllCurrencys,
  getCurrencyById,
  getCurrencyByName,
  deleteCurrencyById,
  updateCurrencyById,
} = require("../controllers/currency.controller");

const router = require("express").Router();

router.post("/create", addCurrency);
router.get("/all", getAllCurrencys);
router.get("/name", getCurrencyByName);
router.get("/:id", getCurrencyById);
router.delete("/:id", deleteCurrencyById);
router.put("/:id", updateCurrencyById);

module.exports = router;
