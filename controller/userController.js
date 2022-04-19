const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/UserSchema");
const todo = require("../models/todoSchema");

const generateJwt = (id, name, age, email) => {
  return jwt.sign(
    { id, name, age, email },
    //TODO: process.env
    "LOLO-LOP",
    { expiresIn: "24h" }
  );
};

class userController {
  async login(req, res) {
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
          //req._user = isExist
          return res.json({ user: isExist, token });
        }
      } else {
        //TODO:
        return res.json({ message: "no user with this name" });
      }
    } catch (e) {
      console.log(e);
      //TODO:
    }
  }

  async registration(req, res) {
    const { name, password, email, age } = req.body;
    try {
      const isExist = User.findOne(email);
      if (isExist) {
        //TODO:
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
      return res.json(isExist);
    } catch (e) {
      console.log(e);
    }
  }

  async updateUser(req, res) {
    const { name, age, password, newPassword } = req.body;
    console.log(req.body);
    const email = req.user.email;
    try {
      const user = await User.findOne({ email });
      if (!user) {
        //TODO: handle the error
      }
      if (!bcrypt.compareSync(user.password, newPassword)) {
        // TODO: error
      }
      const hashPass = await bcrypt.hash(newPassword, 5);
      req.body.password = hashPass;
      const updatedUser = await User.findOneAndUpdate(email, req.body, {
        new: true,
      });
      res.json({ updatedUser });
    } catch (e) {
      console.log(e);
      //TODO: handle the error
    }
  }

  async getAll(req, res) {
    const users = await User.find();
    return res.json({ users });
  }

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
