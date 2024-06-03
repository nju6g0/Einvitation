const jwt = require("jsonwebtoken");

const validation = require("../validation");
const User = require("../models").user;

const { registerValidation, loginValidate } = validation;

const registerUser = async (req, res) => {
  // 確認資料是否符合規範
  const { error } = registerValidation(req.body);
  if (error) {
    return res.status(400).send({ message: error.details[0].message });
  }

  // 確認信箱是否註冊過
  const emailExist = await User.findOne({ email: req.body.email }).exec();
  if (emailExist) {
    return res.status(400).send({ message: "此信箱已註冊過了..." });
  }

  // 儲存新用戶
  const newUser = new User(req.body);
  try {
    const savedUser = await newUser.save();
    return res.send({
      message: "註冊成功",
      data: {
        username: savedUser.username,
        email: savedUser.email,
        thumbnail: savedUser.thumbnail,
      },
    });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};

const login = async (req, res) => {
  // 確認資料是否符合規範
  const { error } = loginValidate(req.body);
  if (error) {
    return res.status(400).send({ message: error.details[0].message });
  }

  // 確認信箱是否註冊過
  const foundUser = await User.findOne({ email: req.body.email }).exec();
  if (!foundUser) {
    return res.status(401).send({ message: "Oops!這個信箱還沒有註冊唷..." });
  }

  // 確認密碼是否一致
  foundUser.comparePassword(req.body.password, (err, isMatch) => {
    if (err) {
      return res
        .status(500)
        .send({ message: "Oops! Something wrong, please try later..." });
    }
    if (isMatch) {
      // 製作 json web token
      const tokenObject = { _id: foundUser._id, email: foundUser.email };
      const token = jwt.sign(tokenObject, process.env.PASSPORT_SECRET);
      return res.send({
        message: "登入成功",
        token: `JWT ${token}`,
        userData: {
          username: foundUser.username,
          email: foundUser.email,
          thumbnail: foundUser.thumbnail,
        },
      });
    } else {
      return res.status(401).send({ message: "帳號/密碼錯誤" });
    }
  });
};

module.exports = {
  registerUser,
  login,
};
