const Reception = require("../models").reception;
const Invitations = require("../models").invitation;

const checkUserReceptionAuth = async (req, res, next) => {
  const reception = await Reception.findOne({
    _id: req.params._id,
  }).exec();

  if (!reception) {
    return res.status(401).send({
      error: true,
      message: "查無該筆資料",
    });
  }

  if (!reception.hostID.equals(req.user._id)) {
    return res.status(401).send({
      error: true,
      massage: "no AUTH",
    });
  }
  next();
};

const checkUserInvitationAuth = async (req, res, next) => {
  const invitation = await Invitations.findOne({
    _id: req.params._id,
  }).exec();

  if (!invitation) {
    return res.status(401).send({
      error: true,
      massage: "查無該筆資料",
    });
  }

  if (!invitation.hostID.equals(req.user._id)) {
    return res.status(401).send({
      error: true,
      massage: "no AUTH",
    });
  }
  next();
};

module.exports = { checkUserReceptionAuth, checkUserInvitationAuth };
