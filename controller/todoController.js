const {
  getTodoBiId,
  getallTodos,
  addTodo,
  deleteById,
} = require("../service/todoService");

class todoController {
  async get(req, res) {
    const { id } = req.user;
    const task = await getTodoBiId(id);
    return res.json(task);
  }

  //TODO: only for admin
  async getAll(req, res) {
    const task = await getallTodos();
    return res.json(task);
  }

  async addTask(req, res) {
    const task = await addTodo(req.body, req.user);
    return res.json(task);
  }

  async deleteById(req, res, next) {
    const { id } = req.params;
    const result = deleteById(id, req.user);
    return res.json(result);
  }
}

module.exports = new todoController();
