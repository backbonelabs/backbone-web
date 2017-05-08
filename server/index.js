const Debug = require("debug");
const express = require("express");
const compression = require("compression");
const path = require("path");
const bodyParser = require("body-parser");
const expressJwt = require("express-jwt");
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const mailRoutes = require("./routes/mail");

const debug = Debug("web");
const app = express();

const { PORT, JWT_SECRET_KEY } = process.env;

const port = PORT || 9999;

// Parse form url-encoded bodies
app.use(bodyParser.json());
// Compress response bodies (by default, only responses 1kb or bigger will be compressed)
app.use(compression());
// Disable the "X-Powered-By: Express" HTTP header
app.disable("x-powered-by");

// app.use(express.static(path.join(__dirname, "./public")));
app.use(express.static(path.join(__dirname, "../build")));

// Protect end points unless it's in the path Array
app.use(
  "/auth",
  expressJwt({ secret: JWT_SECRET_KEY }).unless({
    path: [
      "/auth/login",
      "/auth/signup",
      "/auth/request-reset",
      "/auth/password-reset",
      "/mail/contact",
      "/mail/business",
      "/mail/mailing-list"
    ]
  })
);
app.use("/user", expressJwt({ secret: JWT_SECRET_KEY }));

// Health check
app.use("/ping", (req, res) => {
  res.send("pong");
});

// Routes
app.use("/mail/", mailRoutes);
app.use("/auth/", authRoutes);
app.use("/user/", userRoutes);

app.use("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../build/index.html"));
});

app.listen(port, () => {
  debug(`Express server listening on port`);
});
