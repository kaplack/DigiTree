const mongoose = require("mongoose");

const transferenciaSchema = mongoose.Schema(
  {
    codigoItem: {
      type: String,
      required: true,
    },
    codigoOrigen: {
      type: String,
      required: true,
    },
    codigoDestino: {
      type: String,
      required: true,
    },
    lote: {
      type: String,
      required: true,
    },
    stock: {
      type: Number,
      required: true,
    },
    estado: {
      type: String,
      enum: ["En Tránsito", "Recibido", "Cancelado"],
      default: "En Tránsito",
    },
    fechaTransferencia: {
      type: Date,
      default: Date.now,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Transferencia", transferenciaSchema);
