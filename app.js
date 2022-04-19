const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const exphbs = require("express-handlebars");
const cors = require("cors");
const busboy = require("connect-busboy");
//const {request} = require("express");
const router = require("./routes/mainController");
const app = express();
const { validate, ValidationError, Joi } = require("express-validation");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
//app.use(fileUpload())
app.use(cors());
app.use(busboy());
app.use("/", router);
app.use(function (err, req, res, next) {
  if (err instanceof ValidationError) {
    return res.status(err.statusCode).json(err);
  }

  return res.status(500).json(err);
});
const PORT = 3000;

const url = `mongodb+srv://Dima1:19022002@cluster0654.ratt8.mongodb.net/todoList?retryWrites=true&w=majority`;

async function start() {
  try {
    await mongoose.connect(url, {
      useNewUrlParser: true,
      //useFindAndModify: false,
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
