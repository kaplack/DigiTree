const mongoose = require("mongoose");

// const {
//   medicamento,
//   codigoItem,
//   scan,
//   almacen,
//   codigoAlmacen,
//   ubigeo1,
//   codigoFarmacia,
//   ubigeo2,
// } = formData;

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
    estado: {
      type: String,
    },
    codigoOrigen: {
      type: String,
    },
    stock: {
      type: Number,
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
