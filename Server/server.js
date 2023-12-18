const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const database = require("./config/db");

// env config
dotenv.config();

// user Routes
const userRoutes = require("./routes/UserRoutes");
const blogRoutes = require("./routes/blogRoutes");

// obj of express
const app = express();

// middleware
app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(morgan("dev"));

// database Connection
database.database_connection();

// routes
app.get("/", (req, res) => {
  res.status(200).send({
    message: "Node Server",
  });
});

// routes
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/blog", blogRoutes);

// PORT
const PORT = process.env.PORT || 8080;

// listen
app.listen(PORT, () => {
  console.log(
    `Server is running on ${process.env.DEV_MODE} Mode on port ${PORT}`
  );
});
