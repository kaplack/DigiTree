const express = require("express");
const cors = require("cors");
const colors = require("colors");
const dotenv = require("dotenv").config();
const connectDB = require("./config/db");
const PORT = process.env.PORT || 5000;
const { errorHandler } = require("./middleware/errorMiddleware");

//Connect to database
connectDB();

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res
    .status(200)
    .json({ message: "Bienvenido al modulo de registro de usuario" });
});

// Routes
app.use("/api/users", require("./routes/userRoutes"));

app.use(errorHandler);

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
