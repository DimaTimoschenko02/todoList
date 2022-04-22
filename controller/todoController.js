const ApiError = require("../errors/ApiError");
const TODO = require("../models/TodoSchema");
const {addTodoToUser , removeTodoFromUser } = require('../models/User/manageItems')

class todoController {

  async get(req, res) {
    const task = await TODO.find({ userId: req.user.id });
    return res.json({ task });
  }

  //TODO: only for admin
  async getAll(req, res) {
    const tasks = await TODO.find();
    return res.json({ tasks });
  }

  async addTask(req, res) {
    try {
      const { comments, content } = req.body;
      const { id } = req.user;
      const task = new TODO({
        comments,
        content,
        userId: id,
      });
      await task.save();
      await addTodoToUser(req.user.id, task.id);
      //

      return res.json({ task });
      
    } catch (err) {
      throw err
    }
  }

  async deleteById(req, res , next) {
    const { id } = req.params;
    const isExist = await TODO.findByIdAndRemove(id)
    if(!isExist){
      return next(ApiError.badRequest('no todo with this ID'))
    }
    try {
      removeTodoFromUser(req.user.id , id)
      await TODO.findByIdAndRemove(id);
      return res.json({ mes: "delete successfully" });
    } catch (err) {
      throw err
    }
  }
}

module.exports = new todoController();
