require("dotenv").config();

const express = require("express");
const jwt = require("jsonwebtoken");
const app = express();
const verifyToken = require("./middleware/auth");

app.use(express.json());

//fake daabase
let users = [
  {
    id: "1",
    username: "user1",
    refreshToken: null,
  },
  {
    id: "2",
    username: "user2",
    refreshToken: null,
  },
  {
    id: "3",
    username: "boongmai",
    refreshToken: null,
  },
]

const updateRefeshTokens = (username, refreshToken) => {
  users = users.map((user) => {
    if (user.username === username) return {
        ...user,
        refreshToken,
    }
    return users;
  });
};

const gerenaTokens = (payload) => {
  const { id, username } = payload;
  const accessToken = jwt.sign(
    { id, username },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: "15s",
    }
  );

  const refreshToken = jwt.sign(
    { id, username },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: "1h",
    }
  );

  return { accessToken, refreshToken };
};

app.post("/login", (req, res) => {
  const username = req.body.username;
  const user = users.find((user) => user.username === username);
  if (!user) return res.sendStatus("401");

  const tokens = gerenaTokens(user);
  updateRefeshTokens(username, tokens.refreshToken);
  console.log(users);
  res.json(tokens);
});

app.post("/token", (req, res) => {
  const refreshToken = req.body.refreshToken;
  if (!refreshToken) res.sendStatus(401);

  const user = users.find(user => user.refreshToken === refreshToken);
  if (!user) res.sendStatus(403);

  try {
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

    const tokens = gerenaTokens(user);
    updateRefeshTokens(user.username, tokens.refreshToken);
    res.json(tokens);

  } catch (error) {
    console.log(error);
    res.sendStatus(403);
  }
});

PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`App listen on port ${PORT}`);
});
