const asyncHandler = require("express-async-handler");

const User = require("../models/userModel");

const Transferencia = require("../models/transferModel");

const createTransfer = asyncHandler(async (req, res) => {
  const { codigoItem, estado, codigoOrigen, codigoDestino, lote, stock } =
    req.body;
  //console.log(req.body);

  if (!codigoItem) {
    res.status(400);
    throw new Error("Please add a title and description");
  }

  //console.log(req.user);
  //console.log(req);
  // Get works using id in the JWT
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  const transf = await Transferencia.create({
    codigoItem,
    estado,
    codigoOrigen,
    codigoDestino,
    lote,
    stock,
    user: req.user.id,
  });

  res.status(201).json(transf);
  //console.log(transf);
});

// @desc    Update user works
// @route   PUT /api/works/:id
// @access  Private
const updateTransfer = asyncHandler(async (req, res) => {
  // Get works using id in the JWT
  //console.log("hola del updateMed");
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error(
      "Usuario no existe o ingrese para actualizar el medicamento"
    );
  }

  const { transfId, estado } = req.body;

  //console.log(stock);

  const updatedTransf = await Transferencia.findOneAndUpdate(
    { _id: transfId },
    {
      estado,
    },
    { new: true }
  );

  res.status(200).json(updatedTransf);
});

// @desc    Get All works
// @route   GET /allworks/
// @access  Public

// const getAllMedsByCode = asyncHandler(async (req, res) => {
//   try {
//     console.log("medController ", req.body);
//     console.log(req.body);
//     const work = await Med.find(req.body);

//     //filtrar solo los elementos necesarios para el JobList

//     res.status(200).json(work);
//   } catch (error) {
//     toast.error("No se tiene este medicamento registrado en la base de datos.");
//   }
// });

// @desc    Get user works
// @route   GET /allworks/:id
// @access  Public
const getTransfers = asyncHandler(async (req, res) => {
  //const { codigoItem, codigoFarmacia } = req.params;

  // Construir el filtro dinámico
  const filter = { estado: "En Tránsito" };

  // Realizar la búsqueda
  const transfers = await Transferencia.find(filter);

  if (!transfers) {
    res.status(404);
    throw new Error("No hay transferencias en tránsito");
  }

  res.status(200).json(transfers);
});

module.exports = {
  createTransfer,
  updateTransfer,
  getTransfers,
};
