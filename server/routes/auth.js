const router = require("express").Router();
const passport = require("passport");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
dotenv.config({ path: "./env" });
router.get("/login/success", (req, res) => {
  if (req.user) {
    res.status(200).json({
      error: false,
      message: "Successfully Loged In",
      user: req.user
    });
  } else {
    res.status(403).json({ error: true, message: "Not Authorized" });
  }
});

router.get("/login/failed", (req, res) => {
  res.status(401).json({
    error: true,
    message: "Log in failure"
  });
});

router.get("/google", passport.authenticate("google", ["profile", "email"]));

router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  (req, res) => {
    try {
      const user = req.user;
      const token = jwt.sign(
        {
          id: user.id,
          displayName: user.displayName,
          role: "user",
          email: user.email
        },
        process.env.JWT_SECRET_KEY,
        { expiresIn: "1h" }
      );

      res.cookie("token", token);

      const redirectURL = `http://localhost:3000?token=${token}&user=${encodeURIComponent(
        JSON.stringify(user)
      )}`;
      res.redirect(redirectURL);
    } catch (err) {
      console.error("Google login callback error:", err);
      res.status(500).json({ message: "Google login failed" });
    }
  }
);
router.get("/logout", (req, res) => {
  req.logout();
  req.session.destroy((err) => {
    if (err) {
      console.error("Error destroying session:", err);
      res.sendStatus(500);
    } else {
      res.clearCookie("token");
      res.sendStatus(200);
    }
  });
});

module.exports = router;
