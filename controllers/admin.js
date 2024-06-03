const bcrypt = require("bcrypt");
const User = require("../models").user;
const Reception = require("../models").reception;

const getUser = async (req, res) => {
  try {
    const data = await User.findOne({ _id: req.params._id }).exec();
    return res.send(data);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};
const getUsers = async (req, res) => {
  try {
    const data = await User.find({}).exec();
    return res.send(data);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};

const updateUser = async (req, res) => {
  // TODO: 確認資料是否符合規範

  const { _id } = req.params;
  const { username, thumbnail, email, role, availableQuantity, password } =
    req.body;
  const hashValue = await bcrypt.hash(password, 10);
  try {
    const updatedUser = await User.findOneAndUpdate(
      { _id },
      {
        username,
        thumbnail,
        email,
        role,
        availableQuantity,
        password: hashValue,
      },
      { runValidators: true, new: true }
    ).exec();
    return res.send({
      message: updatedUser ? "更新成功" : "查無該筆資料",
      data: updatedUser,
    });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};

const updateUserPassword = async (req, res) => {
  const { _id } = req.params;
  const { password } = req.body;
  const hashValue = await bcrypt.hash(password, 10);
  try {
    await User.findOneAndUpdate(
      { _id },
      {
        password: hashValue,
      },
      { runValidators: false, new: true }
    ).exec();
    return res.send({
      message: "密碼更新成功，請使用新密碼登入",
    });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};

const getUserReception = async (req, res) => {
  try {
    const data = await Reception.findOne({
      _id: req.params.receptionID,
    }).exec();
    return res.send(data);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};
const getUserReceptions = async (req, res) => {
  try {
    const data = await Reception.find({ hostID: req.params.userID }).exec();
    return res.send(data);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};
const updateUserReception = async (req, res) => {
  const { _id } = req.params;
  const { date, venue, venueAddress, plan, availableQuantity, hostID } =
    req.body;
  try {
    const updatedReception = await Reception.findOneAndUpdate(
      { _id },
      { date, venue, venueAddress, plan, availableQuantity, hostID },
      { runValidators: true, new: true }
    ).exec();
    return res.send({
      message: updatedReception ? "更新成功" : "查無該筆資料",
      data: updatedReception,
    });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};

module.exports = {
  getUser,
  getUsers,
  updateUser,
  updateUserPassword,
  updateUserReception,
  getUserReceptions,
  getUserReception,
};
