const router = require("express").Router();
const multer = require("multer");

const Invitations = require("../controllers").invitations;
const {
  checkUserReceptionAuth,
  checkUserInvitationAuth,
} = require("../utilities/checkUserAuth");

const upload = multer({
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
  },
});

router.use("/", (req, res, next) => {
  next();
});

router.get("/:_id", checkUserReceptionAuth, Invitations.getInvitations);
router.get(
  "/singleInvitation/:_id",
  checkUserInvitationAuth,
  Invitations.getSingleInvitation
);
router.post(
  "/uploadImage",
  upload.single("uploadedImage"),
  Invitations.uploadInvitationImage
);
router.post(
  "/create/:_id",
  checkUserReceptionAuth,
  Invitations.createInvitation
);
router.post(
  "/update/:_id",
  checkUserInvitationAuth,
  Invitations.updateInvitation
);

module.exports = router;
