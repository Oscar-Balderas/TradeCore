const mongoose = require("mongoose");

const validateOperationId = (req, res, next) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      message: "Invalid operation ID",
    });
  }

  next();
};

module.exports = {
  validateOperationId,
};
