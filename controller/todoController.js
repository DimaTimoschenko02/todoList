const TODO = require("../models/TodoSchema");
const User = require("../models/UserSchema");

async function updateTodos(id, todoId) {
  const t = await User.findOne({ id });
  let todosCopy = Object.assign({}, t.todos);
  todosCopy.items.push({ todoId });
  await User.findByIdAndUpdate(id, { todos: todosCopy });
}
//TODO: replace func
class todoController {


  async get(req, res) {
    const task = await TODO.find({ userId: req.user.id });
    return res.json({ task });
  }

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

    
      await updateTodos(req.user.id, task.id);
      //

      return res.json({ task });
      
    } catch (e) {
      console.log(e);
    }
  }

  async deleteById(req, res) {
      //TODO: delete from user arr
    try {
      const { id } = req.params;
      console.log(req.params);
      await TODO.findByIdAndRemove(id);
      return res.json({ mes: "delete successfully" });
    } catch (e) {
      console.log(e);
      // TODO: error
    }
  }
}

module.exports = new todoController();
