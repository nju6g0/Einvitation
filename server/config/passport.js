const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const GoogleStrategy = require("passport-google-oauth20").Strategy;

const { ADMIN } = require("../constants/auth");
const User = require("../models").user;

// JWT 驗證
let opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme("jwt");
opts.secretOrKey = process.env.PASSPORT_SECRET;

passport.use(
  new JwtStrategy(opts, async function (jwt_payload, done) {
    try {
      const foundUser = await User.findOne({ _id: jwt_payload._id }).exec();
      if (foundUser) {
        return done(null, foundUser);
      } else {
        return done(null, false);
      }
    } catch (err) {
      return done(err, false);
    }
  })
);

// GOOGLE LOGIN
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:8080/api/auth/google/redirect",
    },
    async (accessToken, refreshToken, profile, done) => {
      // 判斷使用都是否為第一次登入？
      let foundUser = await User.findOne({ googleID: profile.id }).exec();
      if (foundUser) {
        done(null, foundUser);
      } else {
        // 若為是，則將該使用都存入資料庫。
        const newUser = new User({
          username: profile.displayName,
          googleID: profile.id,
          thumbnail: profile.photos[0].value,
          email: profile.emails[0].value,
        });
        const savedUser = await newUser.save();
        done(null, savedUser);
      }
    }
  )
);
