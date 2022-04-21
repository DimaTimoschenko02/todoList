const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/UserSchema");
const todo = require("../models/todoSchema");
const ApiError = require('../errors/ApiError')

//TODO: replace but where?
const generateJwt = (id, name, age, email) => {
  return jwt.sign(
    { id, name, age, email },
    process.env.SECRET,
    { expiresIn: "24h" }
  );
};

class userController {
  async login(req, res , next) {
    const { email, password } = req.body;
    try {
      const isExist = await User.findOne({ email });
      if (isExist) {
        if (bcrypt.compareSync(password, isExist.password)) {
          const token = generateJwt(
            isExist._id,
            isExist.name,
            isExist.age,
            isExist.email
          );
          return res.json({ user: isExist, token });
        }
      } else {
        return next(ApiError.badRequest('incorrect input'));
      }
    } catch (err) {
      throw err
    }
  }

  async registration(req, res , next) {
    const { name, password, email, age } = req.body;
    try {
      const isExist = await User.findOne({email});
      if (isExist) {
        //console.log({isExist})
        return next(ApiError.badRequest('this email already exist'))
      }
      const hashPass = await bcrypt.hash(password, 5);
      const newUser = new User({
        name,
        email,
        age,
        password: hashPass,
        todos: { items: [] },
      });
      await newUser.save();
      return res.json(newUser);
    } catch (e) {
      console.log(e);
    }
  }

  async updateUser(req, res , next) {
    const { name, age, password, newPassword } = req.body;
    console.log(req.body);
    const email = req.user.email;
    try {
      if (!bcrypt.compareSync(user.password, newPassword)) {
        return next(ApiError.badRequest('uncorrect password'))
      }
      const hashPass = await bcrypt.hash(newPassword, 5);
      req.body.password = hashPass;
      const updatedUser = await User.findOneAndUpdate(email, req.body, {
        new: true,
      });
      res.json({ updatedUser });
    } catch (e) {
      console.log(err);
      throw err
    }
  }
  // TODO: only for admin
  async getAll(req, res) {
    const users = await User.find()
    return res.json({ users });
  }
  // TODO: only for admin
  async deleteById(req, res) {
    const { id } = req.params;
    const items = (await User.findById(id)).todos.items;

    if (items) {
      items.map(async (i) => {
        await todo.findByIdAndDelete(i.todoId);
      });
    }

    await User.findByIdAndDelete(id);
    return res.json({ mes: "deleted successfully" });
  }
}
module.exports = new userController();

// const hashPass = await bcrypt.hash(password, 5)
// const user = await User.create({email, role , password: hashPass})
// // const basket = await Basket.create({userId: user.id})
//
// const token = generateJwt(user.id, user.email, user.role)

//////////
// let isValid = bcrypt.compareSync(password , user.password)
