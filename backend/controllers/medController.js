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
    codigoAlmacen,
    ubigeoAlmacen,
    codigoFarmacia,
    ubigeoFarmacia,
    stock,
    vencimiento,
  } = req.body;
  console.log(req.body);

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
    codigoAlmacen,
    ubigeoAlmacen,
    codigoFarmacia,
    ubigeoFarmacia,
    stock,
    user: req.user.id,
    vencimiento,
  });

  res.status(201).json(med);
  console.log(med);
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
  // Get works using id in the JWT
  console.log("hola del updateMed");
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error(
      "Usuario no existe o ingrese para actualizar el medicamento"
    );
  }

  const {
    medicamento,
    codigoItem,
    almacen,
    codigoAlmacen,
    ubigeoAlmacen,
    codigoFarmacia,
    ubigeoFarmacia,
    stock,
    vencimiento,
  } = req.body;

  // const med = await Med.findOne({ codigoItem });

  // if (!med) {
  //   res.status(400);
  //   throw new Error("Medicamento no existe");
  // }

  // if (med.user.toString() !== req.user.id) {
  //   res.status(401);
  //   throw new Error("Not Authorizer");
  // }

  console.log(stock);

  const updatedWork = await Med.findOneAndUpdate(
    { codigoItem },
    {
      medicamento,
      almacen,
      codigoAlmacen,
      ubigeoAlmacen,
      codigoFarmacia,
      ubigeoFarmacia,
      vencimiento,
      stock,
    },
    { new: true }
  );

  res.status(200).json(updatedWork);
});

// @desc    Get All works
// @route   GET /allworks/
// @access  Public

// const getAllWorks = asyncHandler(async (req,res) => {
//     const work = await Work.find()

//     //filtrar solo los elementos necesarios para el JobList

//     res.status(200).json(work)
// })

// @desc    Get user works
// @route   GET /allworks/:id
// @access  Public
const getMed = asyncHandler(async (req, res) => {
  const med = await Med.findOne({ codigoItem: req.params.codigoItem });

  if (!med) {
    res.status(404);
    throw new Error("Medicamento no existe");
  }
  res.status(200).json(med);
});

module.exports = {
  // getWorks,
  // getWork,
  createMed,
  getMed,
  updateMed,
  // updateWork,
  // deleteWork,
  // getAllWorks,
  // getPublicWork
};
