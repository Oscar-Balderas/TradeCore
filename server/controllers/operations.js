const { validateFields } = require("../utils/validateFields");
const Operation = require("../models/Operation");

const getOperations = async (req, res) => {
  try {
    const { status, operationType } = req.query;

    const filters = {};

    if (status) {
      filters.status = status;
    }

    if (operationType) {
      filters.operationType = operationType;
    }

    const operations = await Operation.find(filters);

    return res.status(200).json(operations);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Error getting operations",
    });
  }
};

const createOperation = async (req, res) => {
  try {
    const operation = req.body;

    const requiredFields = [
      "product",
      "operationType",
      "quantity",
      "unit",
      "origin",
      "destination",
      "supplier",
      "client",
      "incoterm",
    ];

    const allowedFields = [...requiredFields, "status", "notes", "via"];

    const receivedFields = Object.keys(operation);

    const hasInvalidField = validateFields(receivedFields, allowedFields);

    if (hasInvalidField) {
      return res.status(400).json({
        message: "Invalid field",
      });
    }

    const missingField = requiredFields.find(
      (field) => !Object.hasOwn(operation, field),
    );

    if (missingField) {
      return res.status(400).json({
        message: `${missingField} is required`,
      });
    }

    const newOperation = await Operation.create(operation);

    return res.status(201).json(newOperation);
  } catch (error) {
    console.error(error);

    if (error.name === "ValidationError") {
      return res.status(400).json({
        message: error.message,
      });
    }

    return res.status(500).json({
      message: "Error creating operation",
    });
  }
};

const getOperationByID = async (req, res) => {
  try {
    const operation = await Operation.findById(req.params.id);

    if (!operation) {
      return res.status(404).json({
        message: "Operation not found",
      });
    }

    return res.status(200).json(operation);
  } catch (error) {
    return res.status(400).json({
      message: "Invalid operation ID",
    });
  }
};

const updateOperation = async (req, res) => {
  try {
    const information = req.body;

    const allowedFields = [
      "product",
      "operationType",
      "quantity",
      "unit",
      "origin",
      "destination",
      "supplier",
      "client",
      "incoterm",
      "status",
      "notes",
      "via",
    ];

    const receivedFields = Object.keys(information);

    if (receivedFields.length === 0) {
      return res.status(400).json({
        message: "No fields provided for update",
      });
    }

    const hasInvalidField = validateFields(receivedFields, allowedFields);

    if (hasInvalidField) {
      return res.status(400).json({
        message: "Invalid field",
      });
    }

    const updatedOperation = await Operation.findByIdAndUpdate(
      req.params.id,
      information,
      {
        new: true,
        runValidators: true,
      },
    );

    if (!updatedOperation) {
      return res.status(404).json({
        message: "Operation not found",
      });
    }

    return res.status(200).json(updatedOperation);
  } catch (error) {
    console.error(error);
    if (error.name === "CastError") {
      return res.status(400).json({
        message: "Invalid operation ID",
      });
    }
    if (error.name === "ValidationError") {
      return res.status(400).json({
        message: error.message,
      });
    }

    return res.status(500).json({
      message: "Error updating operation",
    });
  }
};

const deleteOperation = async (req, res) => {
  try {
    const deletedOperation = await Operation.findByIdAndDelete(req.params.id);

    if (!deletedOperation) {
      return res.status(404).json({
        message: "Operation not found",
      });
    }

    return res.status(200).json({
      message: "Operation deleted",
    });
  } catch (error) {
    return res.status(400).json({
      message: "Invalid operation ID",
    });
  }
};

module.exports = {
  getOperations,
  createOperation,
  getOperationByID,
  updateOperation,
  deleteOperation,
};
