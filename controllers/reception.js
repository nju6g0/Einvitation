const validation = require("../validation");

const Reception = require("../models").reception;

const { createReceptionValidation, updateReceptionValidation } = validation;

const getReceptions = async (req, res) => {
  try {
    const data = await Reception.find({ hostID: req.user._id }).exec();
    return res.send({
      availableQuantity: req.user.availableQuantity,
      receptionList: data,
    });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};

const getReception = async (req, res) => {
  try {
    const data = await Reception.findOne({
      _id: req.params._id,
    }).exec();
    return res.send(data);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};

const createReception = async (req, res) => {
  // 確認資料是否符合規範
  const { error } = createReceptionValidation(req.body);
  if (error) {
    return res.status(400).send({ message: error.details[0].message });
  }

  // 確認 user 創建的 receptions，是否已達上限
  const isReachMax = await Reception.hasReachMax(
    req.user._id,
    req.user.availableQuantity
  );
  if (isReachMax) {
    return res.status(400).send({
      error: true,
      message: "已達可建立上限",
    });
  }

  // 儲存 reception
  const { date, venue, venueAddress } = req.body;
  const newReception = new Reception({
    date,
    venue,
    venueAddress,
    hostID: req.user._id,
  });
  try {
    const savedReception = await newReception.save();
    return res.send({
      message: "新增成功",
      data: savedReception,
    });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};

const updateReception = async (req, res) => {
  // 確認資料是否符合規範
  const { error } = updateReceptionValidation(req.body);
  if (error) {
    return res.status(400).send({ message: error.details[0].message });
  }

  const { _id } = req.params;
  //儲存 reception
  const { date, venue, venueAddress } = req.body;
  try {
    const updatedReception = await Reception.findOneAndUpdate(
      { _id },
      { date, venue, venueAddress },
      { runValidators: true, new: true }
    ).exec();
    return res.send({
      message: "更新成功",
      data: updatedReception,
    });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};

module.exports = {
  getReceptions,
  getReception,
  createReception,
  updateReception,
};
