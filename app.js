const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const busboy = require("connect-busboy");
const { ValidationError } = require("express-validation");
require('dotenv').config()

const router = require("./routes/mainController");


const app = express()

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(busboy());
app.use("/api", router);

app.use(function (err, req, res, next) {
  if (err instanceof ValidationError) {
    return res.status(err.statusCode).json(err);
  }
  return res.status(500).json(err);
});

const PORT = process.env.PORT || 3001

const url = `mongodb+srv://Dima1:19022002@cluster0654.ratt8.mongodb.net/todoList?retryWrites=true&w=majority`;

async function start() {
  try {
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    app.listen(PORT, () => {
      console.log(`server is running on port ${PORT}`);
    });
  } catch (e) {
    console.log(e);
  }
}

start();
