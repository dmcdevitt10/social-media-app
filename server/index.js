require("dotenv").config();
const express = require("express");
const cors = require("cors");

const { PORT } = process.env;
const app = express();

app.use(express.json());
app.use(cors());

const { sequelize } = require("./util/database");
const { User } = require("./models/user");
const { Post } = require("./models/post");

const { login, register } = require("./controllers/auth");
const {
  getAllPosts,
  getCurrentUserPosts,
  addPost,
  editPost,
  deletePost,
} = require("./controllers/posts");
const { isAuthenticated } = require("./middleware/isAuthenticated");

User.hasMany(Post);
Post.belongsTo(User);

app.get("/posts", getAllPosts);
app.get("./userposts/:userId", getCurrentUserPosts);

app.post("/register", register);
app.post("/login", login);
app.post("/posts", isAuthenticated, addPost);

app.put("/posts/:id", isAuthenticated, editPost);

app.delete("/posts/:id", isAuthenticated, deletePost);

sequelize.sync({ force: true }).then(() => {
  app.listen(PORT, () =>
    console.log(`db sync successful and app is listening on port ${PORT}`)
  );
});
