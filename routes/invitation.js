const router = require("express").Router();

const Invitation = require("../controllers").invitation;

router.use("/", (req, res, next) => {
  next();
});

router.get("/:_id", Invitation.getInvitation);
router.post("/updateAttendant/:_id", Invitation.updateAttendant);

module.exports = router;
