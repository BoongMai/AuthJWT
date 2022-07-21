require("dotenv").config();

const express = require("express");
const jwt = require("jsonwebtoken");
const app = express();
const verifyToken = require("./middleware/auth");

app.use(express.json());

const posts = [
  {
    userId: "1",
    content: "Auth user1",
  },
  {
    userId: "1",
    content: "Auth post2 user1",
  },
  {
    userId: "2",
    username: "Auth user2",
  },
  {
    userId: "3",
    username: "Auth boongmai",
  },
];

app.get("/post", verifyToken, (req, res) => {
  res.json(posts.filter((post) => post.userId == req.userId));
});

PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`App listen on port ${PORT}`);
});
