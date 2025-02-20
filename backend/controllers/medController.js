const asyncHandler = require("express-async-handler");

const User = require("../models/userModel");
const Med = require("../models/medModel");

// @desc    Get user works
// @route   GET /api/works
// @access  Private
// const getWorks = asyncHandler(async (req,res) => {
//     // Get works using id in the JWT
//     const user = await User.findById(req.user.id)

//     if(!user){
//         res.status(401)
//         throw new Error('User not found')
//     }

//     const works = await Work.find({user: req.user.id})

//     res.status(200).json(works)
// })

// @desc    Get user works
// @route   GET /api/works/:id
// @access  Private
// const getWork = asyncHandler(async (req,res) => {
//     // Get works using id in the JWT
//     const user = await User.findById(req.user.id)

//     if(!user){
//         res.status(401)
//         throw new Error('User not found or not conected')
//     }

//     const work = await Work.findById(req.params.id)

//     if(!work){
//         res.status(400)
//         throw new Error('Work not found')
//     }

//     if(work.user.toString() !== req.user.id){
//         res.status(401)
//         throw new Error('Not Authorizer')
//     }

//     res.status(200).json(work)
// })

// @desc    create works
// @route   POST /api/works
// @access  Private
const createMed = asyncHandler(async (req, res) => {
  const {
    medicamento,
    codigoItem,
    almacen,
    codigoFarmacia,
    stock,
    vencimiento,
    lote,
  } = req.body;
  //console.log(req.body);

  if (!medicamento || !codigoItem) {
    res.status(400);
    throw new Error("Please add a title and description");
  }

  //console.log(req);
  // Get works using id in the JWT
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  const med = await Med.create({
    medicamento,
    codigoItem,
    almacen,
    codigoFarmacia,
    stock,
    user: req.user.id,
    vencimiento,
    lote,
    docId,
  });

  res.status(201).json(med);
  //console.log(med);
});

// @desc    Delete user works
// @route   DELETE /api/works/:id
// @access  Private
// const deleteWork = asyncHandler(async (req,res) => {
//     // Get works using id in the JWT
//     const user = await User.findById(req.user.id)

//     if(!user){
//         res.status(401)
//         throw new Error('User not found or not conected')
//     }
//     console.log("controller: ", req.params.id)
//     const work = await Work.findById(req.params.id)

//     if(!work){
//         res.status(400)
//         throw new Error('Work not found')
//     }

//     if(work.user.toString() !== req.user.id){
//         res.status(401)
//         throw new Error('Not Authorizer')
//     }

//     await Work.findByIdAndDelete({ _id: req.params.id });

//     res.status(200).json({success: true})
// })

// @desc    Update user works
// @route   PUT /api/works/:id
// @access  Private
const updateMed = asyncHandler(async (req, res) => {
  try {
    // Obtener usuario autenticado
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(401).json({
        message: "Usuario no autorizado para actualizar el medicamento",
      });
    }

    const {
      medicamento,
      codigoItem,
      almacen,
      codigoFarmacia,
      stock,
      vencimiento,
      lote,
      docId,
    } = req.body;

    console.log("updateMed - Datos recibidos:", req.body);

    // Validar que los campos clave estén presentes
    if (!codigoItem || !codigoFarmacia || !lote) {
      return res.status(400).json({
        message: "Faltan datos clave (codigoItem, codigoFarmacia, lote).",
      });
    }

    // Construir objeto con solo los campos definidos
    const updateFields = {};
    if (typeof stock !== "undefined") updateFields.stock = stock;
    if (typeof docId !== "undefined") updateFields.docId = docId;
    //if (typeof almacen !== "undefined") updateFields.almacen = almacen;
    //if (typeof vencimiento !== "undefined") updateFields.vencimiento = vencimiento;

    console.log("updateMed - Datos a actualizar:", updateFields);

    // Buscar y actualizar el medicamento
    const updatedMed = await Med.findOneAndUpdate(
      { codigoItem, codigoFarmacia, lote },
      updateFields,
      { new: true, runValidators: true } // `runValidators` asegura validación del esquema
    );

    if (!updatedMed) {
      return res.status(404).json({
        message: "Medicamento no encontrado.",
      });
    }

    console.log("updateMed - Medicamento actualizado:", updatedMed);
    return res.status(200).json(updatedMed);
  } catch (error) {
    console.error("updateMed - Error en la actualización:", error);
    return res.status(500).json({
      message: "Error al actualizar el medicamento",
      error: error.message,
    });
  }
});

// @desc    Get All works
// @route   GET /allworks/
// @access  Public

const getAllMedsByCode = asyncHandler(async (req, res) => {
  try {
    //console.log("medController ", req.body);
    //console.log(req.body);
    const work = await Med.find(req.body);

    //filtrar solo los elementos necesarios para el JobList
    //console.log("getallMEDS", work);
    res.status(200).json(work);
  } catch (error) {
    toast.error("No se tiene este medicamento registrado en la base de datos.");
  }
});

// @desc    Get user works
// @route   GET /allworks/:id
// @access  Public
const getMed = asyncHandler(async (req, res) => {
  const { codigoItem, codigoFarmacia } = req.params;

  // Construir el filtro dinámico
  const filter = { codigoItem };
  if (codigoFarmacia) {
    filter.codigoFarmacia = codigoFarmacia;
  }

  // Realizar la búsqueda
  const med = await Med.findOne(filter);

  if (!med) {
    res.status(404);
    throw new Error("Medicamento no encontrado");
  }

  res.status(200).json(med);
});

module.exports = {
  // getWorks,
  // getWork,
  createMed,
  getMed,
  updateMed,
  getAllMedsByCode,
  // updateWork,
  // deleteWork,
  // getAllWorks,
  // getPublicWork
};
