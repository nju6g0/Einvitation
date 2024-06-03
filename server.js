require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const authRoute = require("./routes").auth;
const receptionRoute = require("./routes").reception;
const invitationsRoute = require("./routes").invitations;
const invitationRoute = require("./routes").invitation;
const adminRoute = require("./routes").admin;
const passport = require("passport");
require("./config/passport");
const path = require("path");
const port = process.env.PORT || 8080;

// 連結 mongoDB
mongoose
  // .connect("mongodb://127.0.0.1:27017/einvitationDB")
  .connect(process.env.MONGODB_CONNECTION)
  .then(() => {
    console.log("mongoDB has connected...");
  })
  .catch((e) => {
    console.log("mogoDB connect failure.");
    console.log(e);
  });

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(
  express.static(path.join(__dirname, "client", ".next", "server", "pages"))
);

app.use("/api/auth", authRoute);
app.use(
  "/api/reception",
  passport.authenticate("jwt", { session: false }),
  receptionRoute
);
app.use(
  "/api/invitations",
  passport.authenticate("jwt", { session: false }),
  invitationsRoute
);
app.use("/api/invitation", invitationRoute);
app.use(
  "/api/admin",
  passport.authenticate("jwt", { session: false }),
  adminRoute
);
app.get(
  "/api/user",
  passport.authenticate("jwt", { session: false }),
  (req, res) =>
    res.send({
      username: req.user.username,
      email: req.user.email,
      thumbnail: req.user.thumbnail,
    })
);

if (
  process.env.NODE_ENV === "production" ||
  process.env.NODE_ENV === "staging"
) {
  app.get("*", (req, res) => {
    res.sendFile(
      path.join(__dirname, "client", ".next", "server", "pages", "index.html")
    );
  });
}

app.listen(port, () => {
  console.log(`server is listening on ${port} port...`);
});
