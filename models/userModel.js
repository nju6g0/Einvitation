const mongoose = require("mongoose");
const { Schema } = mongoose;
const bcrypt = require("bcrypt");

const {
  MIN_PASSWORD_LENGTH,
  MAX_PASSWORD_LENGTH,
  MIN_USERNAME_LENGTH,
  MAX_USERNAME_LENGTH,
  MEMBER,
  ADMIN,
} = require("../constants/auth");

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    minLength: MIN_USERNAME_LENGTH,
    maxLength: MAX_USERNAME_LENGTH,
  },
  googleID: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  thumbnail: {
    type: String,
  },
  // local login
  email: {
    type: String,
  },
  password: {
    type: String,
    minLength: MIN_PASSWORD_LENGTH,
  },
  role: {
    type: String,
    enum: [ADMIN, MEMBER],
    default: MEMBER,
    require: true,
  },
  availableQuantity: {
    type: Number,
    required: true,
    default: 2,
  },
});

// instance method
userSchema.methods.isAdmin = function () {
  return this.role === ADMIN;
};

userSchema.methods.comparePassword = async function (password, callback) {
  let result;
  try {
    result = await bcrypt.compare(password, this.password);
    return callback(null, result);
  } catch (err) {
    return callback(err, result);
  }
};

// mongoose middlewares
userSchema.pre("save", async function (next) {
  /* 當使用者為新用戶 或 使用者更改密碼時，在儲存前將密碼進行雜湊處理。
      this 指 mongoDB 內的 document
      isNew 及 isModified() 為 mongoose 裡的屬性 */
  if (this.password && (this.isNew || this.isModified("password"))) {
    const hashValue = await bcrypt.hash(this.password, 10);
    this.password = hashValue;
  }
  next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
