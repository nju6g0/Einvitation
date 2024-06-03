const router = require("express").Router();

const Reception = require("../controllers").reception;
const { checkUserReceptionAuth } = require("../utilities/checkUserAuth");

router.use("/", (req, res, next) => {
  next();
});

router.get("/", Reception.getReceptions);
router.get("/:_id", checkUserReceptionAuth, Reception.getReception);
router.post("/", Reception.createReception);
router.post("/update/:_id", checkUserReceptionAuth, Reception.updateReception);

module.exports = router;
