const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const errorHandler = require('./middleware/ErrorHandlingMiddleware')
const router = require("./routes/mainController");
const busboy = require("connect-busboy");
require('dotenv').config()

const app = express()

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(busboy());
app.use("/api", router);

app.use(errorHandler);
const PORT = process.env.PORT || 3001
const URL = `mongodb+srv://Dima1:19022002@cluster0654.ratt8.mongodb.net/todoList?retryWrites=true&w=majority`

async function start() {
  try {
    await mongoose.connect(URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    app.listen(PORT, () => {
      console.log(`server is running on port ${PORT}`);
    });
  } catch (err) {
    console.log(err);
  }
}

start();
