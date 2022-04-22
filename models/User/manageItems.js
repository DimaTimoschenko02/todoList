module.exports = async function addTodoToUser(id, todoId) {
    const t = await User.findOne({ id });
    let todosCopy = Object.assign({}, t.todos);
    todosCopy.items.push({ todoId });
    await User.findByIdAndUpdate(id, { todos: todosCopy });
  }

module.exports = async function removeTodoFromUser(id, todoId) {
    const t = await User.findOne({ id });
    let todosCopy = Object.assign({}, t.todos);
    const newItems = todosCopy.items.filter(item => item.todoId !== todoId)
    await User.findByIdAndUpdate(id, { todos: newItems });
  }