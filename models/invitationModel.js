const mongoose = require("mongoose");
const { Schema } = mongoose;

const invitationSchema = new Schema({
  receptionID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Reception",
    required: true,
  },
  hostID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  reciever: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    maxLength: 300,
  },
  imageUrl: {
    type: String,
  },
  isAttend: {
    type: Boolean,
  },
  attendantCount: {
    type: Number,
  },
  template: {
    type: String,
    default: "A01",
    require: true,
  },
});

// instance method
invitationSchema.method.isAuth = function (userID) {
  return this.hostID === userID;
};

invitationSchema.method.editable = function (userID) {
  return this.isAttend === null;
};

// statics method
invitationSchema.statics.hasReachMax = async function (
  receptionID,
  limitation
) {
  const data = await this.find({ receptionID }).exec();
  return data.length >= limitation;
};

const Invitation = mongoose.model("Invitation", invitationSchema);

module.exports = Invitation;
