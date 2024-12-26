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
    user: req.user.id,
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
  // const user = await User.findById(req.user.id)

  // if(!user){
  //     res.status(401)
  //     throw new Error('User not found or not conected')
  // }

  const med = await Med.findById(req.body);

  if (!work) {
    res.status(400);
    throw new Error("Work not found");
  }

  if (work.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("Not Authorizer");
  }

  const {
    title,
    jobCategory,
    workTime,
    workWay,
    experience,
    qualification,
    workPay,
    country,
    city,
    workPlace,
    description,
    workFunctions,
    workRequire,
    contactMail,
    iDate,
    fDate,
    actTime,
    workStatus,
    active,
  } = req.body;

  const updatedWork = await Work.findByIdAndUpdate(
    req.params.id,
    {
      title,
      jobCategory,
      workTime,
      workWay,
      experience,
      qualification,
      workPay,
      country,
      city,
      workPlace,
      description,
      workFunctions,
      workRequire,
      contactMail,
      iDate,
      fDate,
      actTime,
      workStatus,
      active,
      location: workPlace + ", " + city + " - " + country,
      user: req.user.id,
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
// const getPublicWork = asyncHandler(async (req,res) => {

//     const work = await Work.findById(req.params.id)

//     if(!work){
//         res.status(400)
//         throw new Error('Work not found')
//     }
//     res.status(200).json(work)
// })

module.exports = {
  // getWorks,
  // getWork,
  createMed,
  // updateWork,
  // deleteWork,
  // getAllWorks,
  // getPublicWork
};
