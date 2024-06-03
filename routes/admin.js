const router = require("express").Router();
const { ADMIN } = require("../constants/auth");
const Admin = require("../controllers").admin;

router.use("/", async (req, res, next) => {
  if (req.user.role !== ADMIN) {
    return res.status(401).send({ error: true, message: "no AUTH" });
  }
  next();
});

router.get("/", Admin.getUsers);
router.get("/user/:_id", Admin.getUser);
router.post("/updateUser/:_id", Admin.updateUser);
router.post("/updateUserPassword/:_id", Admin.updateUserPassword);
router.post("/updateUserReception/:_id", Admin.updateUserReception);
router.get("/userReception/:receptionID", Admin.getUserReception);
router.get("/userReceptions/:userID", Admin.getUserReceptions);

module.exports = router;
