const router = require("express").Router();
const passport = require("passport");
const jwt = require("jsonwebtoken");

const Auth = require("../controllers").auth;

router.use((req, res, next) => {
  next();
});

router.post("/register", Auth.registerUser);
router.post("/login", Auth.login);

// ＧＯＯＧＬＥ LOGIN
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["email", "profile"],
    prompt: "select_account",
  })
);
// 已通過 Google 驗證後的轉址
router.get(
  "/google/redirect",
  passport.authenticate("google", { session: false }),
  (req, res) => {
    // 製作 json web token
    const tokenObject = { _id: req.user._id, email: req.user.email };
    const token = jwt.sign(tokenObject, process.env.PASSPORT_SECRET);

    return res.redirect(`${process.env.DOMAIN}auth/google/JWT ${token}`);
  }
);

module.exports = router;
