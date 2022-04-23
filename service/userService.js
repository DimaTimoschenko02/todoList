const User = require("../models/UserSchema");
const ApiError = require("../errors/ApiError");
const bcrypt = require("bcrypt");
const generateJwt = require("../middleware/generateJwt");
const Todo = require("../models/TodoSchema");

async function loginUser(email, password) {
  try {
    const isExist = await User.findOne({ email });
    if (!isExist) {
      return next(ApiError.badRequest("incorrect input"));
    }
    if (bcrypt.compareSync(password, isExist.password)) {
      const token = generateJwt(
        isExist._id,
        isExist.name,
        isExist.age,
        isExist.email,
        isExist.role
      );
      return { user: isExist, token };
    }
  } catch (err) {
    throw err;
  }
}

async function registrationUser(body) {
  const { name, password, email, age, role } = body;
  try {
    const isExist = await User.findOne({ email });
    if (isExist) {
      return next(ApiError.badRequest("this email already exist"));
    }
    const hashPass = await bcrypt.hash(password, 5);
    const newUser = new User({
      name,
      email,
      age,
      password: hashPass,
      role,
      todos: { items: [] },
    });
    await newUser.save();
    return { newUser };
  } catch (err) {
    throw err;
  }
}
//TODO: add token
async function updateUser(body, email) {
  const { name, age, password, newPassword } = body;
  const user = await User.findOne({ email });
  try {
    if (!bcrypt.compareSync(password, user.password)) {
      return ApiError.badRequest("uncorrect password");
    }
    const hashPass = await bcrypt.hash(newPassword, 5);
    const updatedUser = await User.findOneAndUpdate(
      email,
      { ...body, password: hashPass },
      { new: true }
    );
    await updatedUser.save();
    return { updatedUser };
  } catch (err) {
    throw err;
  }
}

async function deleteUserById(id) {
  const items = (await User.findById(id)).todos.items;

  if (items) {
    items.map(async (i) => {
      await Todo.findByIdAndDelete(i.todoId);
    });
  }
  await User.findByIdAndDelete(id);
  return { message: "deleted successfully" };
}

async function getAllUsers() {
  const users = await User.find();
  return { users };
}

module.exports = {
  loginUser,
  registrationUser,
  updateUser,
  deleteUserById,
  getAllUsers,
};
