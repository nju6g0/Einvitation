const validation = require("../validation");
const Invitations = require("../models").invitation;
const Reception = require("../models").reception;

const getInvitation = async (req, res) => {
  const { _id } = req.params;
  try {
    const invitationData = await Invitations.findOne({ _id }).exec();
    const receptionData = await Reception.findOne({
      _id: invitationData.receptionID,
    }).exec();
    return res.send({ invitationData, receptionData });
  } catch (err) {
    return res.status(500).send({ error: true, message: err.message });
  }
};

const updateAttendant = async (req, res) => {
  // TODO: 確認資料是否符合規範

  //儲存 invitation
  const { _id } = req.params;
  const { isAttend, attendantCount } = req.body;
  try {
    const updatedInvitation = await Invitations.findOneAndUpdate(
      { _id },
      { isAttend, attendantCount },
      { runValidators: true, new: true }
    ).exec();
    return res.send({
      message: "更新成功",
      data: updatedInvitation,
    });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};

module.exports = {
  getInvitation,
  updateAttendant,
};
