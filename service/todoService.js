const User = require("../models/UserSchema");
const ApiError = require("../errors/ApiError");
const TODO = require("../models/TodoSchema");

async function addTodoToUser(id, todoId) {
  const t = await User.findOne({ id });
  let todosCopy = Object.assign({}, t.todos);
  todosCopy.items.push({ todoId });
  await User.findByIdAndUpdate(id, { todos: todosCopy });
}

async function removeTodoFromUser(id, todoId) {
  const t = await User.findOne({ id });
  let todosCopy = Object.assign({}, t.todos);
  const newItems = todosCopy.items.filter((item) => item.todoId !== todoId);
  await User.findByIdAndUpdate(id, { todos: newItems });
}

async function getTodoBiId(userId) {
  const task = await TODO.find({ userId });
  return { task };
}

async function getallTodos() {
  const task = await TODO.find();
  return { task };
}

async function addTodo(body, user) {
  try {
    const { comments, content } = body;
    const { id } = user;
    const task = new TODO({
      comments,
      content,
      userId: id,
    });
    await task.save();
    await addTodoToUser(user.id, task.id);
    //

    return { task };
  } catch (err) {
    throw err;
  }
}
async function deleteById(id, user) {
  const isExist = await TODO.findByIdAndRemove(id);
  if (!isExist) {
    return next(ApiError.badRequest("no todo with this ID"));
  }
  try {
    removeTodoFromUser(user.id, id);
    await TODO.findByIdAndRemove(id);
    return res.json({ mes: "delete successfully" });
  } catch (err) {
    throw err;
  }
}
module.exports = {
  getTodoBiId,
  getallTodos,
  addTodo,
  deleteById,
};
