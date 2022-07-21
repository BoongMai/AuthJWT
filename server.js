require("dotenv").config();

const express = require("express");
const jwt = require("jsonwebtoken");
const app = express();
const verifyToken = require("./middleware/auth");

app.use(express.json());

const users = [
  {
    id: "1",
    username: "duy",
  },
  {
    id: "2",
    username: "duy2",
  },
  {
    id: "3",
    username: "boongmai",
  },
];

app.get("/post", verifyToken, (req, res) => {
  res.json({ user: "Boongmai" });
});

app.post("/login", (req, res) => {
  const username = req.body.username;
  const user = users.find((user) => user.username === username);
  if (!user) return res.sendStatus("401");
  const accesstoken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
  if (user) {
    res.json({
      username,
      accesstoken: accesstoken,
    });
  }
});

PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`App listen on port ${PORT}`);
});
