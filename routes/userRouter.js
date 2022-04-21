const { Router } = require("express");
const userController = require("../controller/userController");
const authCheck = require("../middleware/authCheck");
const { validate } = require("express-validation");
const {
  loginValidation,
  registrationValidation,
  updateValidation
} = require("../middleware/validation/userValidate");
const router = Router();

router.post("/login", validate(loginValidation, {}, {}), userController.login);
router.post("/registration",validate(registrationValidation, {} , {}), userController.registration);
router.patch("/update" , validate(updateValidation) , authCheck, userController.updateUser)
// TODO: ?
router.get("/users", userController.getAll);
router.delete("/delete/:id", userController.deleteById);
router.get("/logout", authCheck, function (req, res, next) {
  req.user = undefined
  return res.redirect("/login")
});

module.exports = router;

