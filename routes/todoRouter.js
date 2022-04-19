const { Router } = require("express");
const todoController = require("../controller/todoController");
const authCheck = require("../middleware/authCheck");
const router = Router();
const todoValidation = require("../middleware/validation/todoValidate");
const { validate } = require("express-validation");

router.post("/add", authCheck, validate(todoValidation , {} , {}), todoController.addTask);
router.delete("/delete/:id", authCheck, todoController.deleteById);
router.get("/", authCheck, todoController.get);

module.exports = router;
