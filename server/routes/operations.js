const router = require("express").Router();
const {
  getOperations,
  createOperation,
  getOperationByID,
  updateOperation,
  deleteOperation,
} = require("../controllers/operations");
const { validateOperationId } = require("../middlewares/validateOperationId");
router.get("/", getOperations);
router.post("/", createOperation);

router.get("/:id", validateOperationId, getOperationByID);

router.patch("/:id", validateOperationId, updateOperation);

router.delete("/:id", validateOperationId, deleteOperation);

module.exports = router;
