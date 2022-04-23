const {
  loginUser,
  registrationUser,
  updateUser,
  deleteUserById,
  getAllUsers
} = require("../service/userService");

class userController {
  async login(req, res, next) {
    const { email, password } = req.body;
    const user = await loginUser(email, password);
    res.json(user);
  }
  async registration(req, res, next) {
    const user = await registrationUser(req.body);
    res.json(user);
  }
  async updateData(req, res, next) {
    const { email } = req.user;
    const user = await updateUser(req.body, email);
    res.json(user);
  }
  // TODO: only for admin
  async getAll(req, res) {
    const users = getAllUsers()
    return res.json(users);
  }
  // TODO: only for admin
  async deleteById(req, res) {
    const { id } = req.params;
    const result = await deleteUserById(id);
    res.json(result);
  }
}
module.exports = new userController();
