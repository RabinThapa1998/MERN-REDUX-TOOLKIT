const express = require("express");
const mongoose = require("mongoose");
const app = express();
const Usermodel = require("./models/user");
const Todomodel = require("./models/todo");
const bcrypt = require("bcryptjs");
const jwttoken = require("jsonwebtoken");
const { SECRET_KEY, DATABASE } = require("./config/keys");
const cors = require("cors");
app.use(express.json());
const PORT = 5500;
const JWT_SECRET = SECRET_KEY;

const url =
  process.env.NODE_ENV == "production"
    ? "https://serverless2-pi0h5tqcf-rabinthapa1998.vercel.app"
    : "http://localhost:3000";

app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

const DB = DATABASE;
mongoose
  .connect(DB)
  .then(() => {
    console.log("connected to mongodb database");
    app.listen(PORT, () => {
      console.log("server running on", PORT);
    });
  })
  .catch((err) => {
    console.log("mongodb error", err);
  });

// mongoose.connection.on("connected", () => {
//   console.log("connected to mongodb database");
// });

// mongoose.connection.on("error", (err) => {
//   console.log("mongodb error", err);
// });

app.get("/", (req, res) => {
  res.json({ message: "helloworld" });
});

const requireLogin = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    res.status(401).json({ error: "user must logged in" });
  }
  try {
    const { userId } = jwttoken.verify(authorization, JWT_SECRET);
    req.user = userId;
    next();
  } catch (err) {
    res.status(401).json({ error: "user must logged in", err });
  }
};

app.post("/createtodo", requireLogin, async (req, res) => {
  const { todo } = req.body;
  try {
    if (todo) {
      const data = await new Todomodel({
        todo: todo,
        todoBy: req.user,
      }).save();
      res.status(201).json({ message: data });
    }
  } catch (error) {
    console.log("todo errro");
  }
});

app.get("/gettodos", requireLogin, async (req, res) => {
  const data = await Todomodel.find({
    todoBy: req.user,
  });
  res.status(201).json({ message: data });
});
app.delete("/remove/:id", requireLogin, async (req, res) => {
  const removedTodo = await Todomodel.findOneAndRemove({ _id: req.params.id });
  res.status(200).json({ message: removedTodo });
});

app.post("/signup", async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      res.status(422).json({ message: "either email  or password is empty" });
    }
    const user = await Usermodel.findOne({ email: email });
    if (user) {
      res.status(422).json({ message: "user already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    await new Usermodel({
      email,
      password: hashedPassword,
    }).save();

    res.status(200).json({ message: "Sign Up successful" });
  } catch (err) {
    console.log("sign up error", err);
  }
});

app.post("/signin", async (req, res) => {
  const { email, password } = req.body;

  console.log(req.body);
  try {
    if (!email || !password) {
      res.status(422).json({ message: "either email  or password is empty" });
    }
    const user = await Usermodel.findOne({ email: email });
    if (!user) {
      res.status(404).json({ message: "user do not exists" });
    }

    const doMatch = await bcrypt.compare(password, user.password);
    console.log("doMatch", doMatch);
    if (!doMatch) {
      res.status(401).json({ message: "email or password invalid" });
    }

    const token = jwttoken.sign({ userId: user._id }, JWT_SECRET);
    console.log(token);
    res.status(200).json({ message: "Sign in successful", token: token });
  } catch (err) {
    console.log("sign in error", err);
  }
});

if (process.env.NODE_ENV == "production") {
  const path = require("path");
  app.get("/", (req, res) => {
    app.use(express.static(path.resolve(__dirname, "client", "build")));
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}
