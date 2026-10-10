const mongoose = require("mongoose");

const operationSchema = new mongoose.Schema({
  product: {
    type: String,
    required: true,
    trim: true,
  },

  operationType: {
    type: String,
    required: true,
    enum: ["Import", "Export"],
  },

  quantity: {
    type: Number,
    required: true,
    min: 0.01,
  },

  unit: {
    type: String,
    required: true,
    trim: true,
  },

  origin: {
    type: String,
    required: true,
    trim: true,
  },

  destination: {
    type: String,
    required: true,
    trim: true,
  },

  supplier: {
    type: String,
    required: true,
    trim: true,
  },

  client: {
    type: String,
    required: true,
    trim: true,
  },

  incoterm: {
    type: String,
    required: true,
    enum: ["EXW", "FCA", "FOB", "CFR", "CIF", "DAP", "DPU", "DDP"],
  },

  status: {
    type: String,
    enum: ["Negotiation", "Confirmed", "In Transit", "Delivered"],
    default: "Negotiation",
  },

  notes: {
    type: String,
    trim: true,
  },

  via: {
    type: String,
    trim: true,
    default: "",
  },
});

module.exports = mongoose.model("Operation", operationSchema);
