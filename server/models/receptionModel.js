const mongoose = require("mongoose");
const { Schema } = mongoose;

const receptionSchema = new Schema({
  availableQuantity: {
    // 可以建立的 invitation 數量
    type: Number,
    required: true,
    default: 3,
  },
  date: {
    type: Date,
    required: true,
  },
  venue: {
    type: String,
  },
  venueAddress: {
    type: String,
    required: true,
  },
  hostID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  plan: {
    // 可以選擇的 template 範圍
    type: [String],
    default: ["A"],
    require: true,
  },
});

// instance method
receptionSchema.method.isAuth = function (userID) {
  return this.hostID === userID;
};

// statics method
receptionSchema.statics.hasReachMax = async function (userID, limitation) {
  const data = await this.find({ hostID: userID }).exec();
  return data.length >= limitation;
};

const Reception = mongoose.model("Reception", receptionSchema);

module.exports = Reception;
