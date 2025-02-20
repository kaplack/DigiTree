const mongoose = require("mongoose");

const medSchema = mongoose.Schema(
  {
    medicamento: {
      type: String,
      required: [true, "Please add a name"],
    },
    codigoItem: {
      type: String,
      required: true,
    },
    almacen: {
      type: String,
      required: true,
    },
    codigoFarmacia: {
      type: String,
      required: true,
    },
    stock: {
      type: Number,
    },
    docId: {
      type: Number,
    },
    lote: {
      type: String,
    },
    vencimiento: {
      type: Date,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      //type: String,
      require: true,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Med", medSchema);
