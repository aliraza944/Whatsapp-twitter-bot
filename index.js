const express = require("express");
const postRoute = require("./routes/post");
require("dotenv/config");
const app = express();
const cors = require("cors");
app.use(express.json({ extended: false }));
app.use(cors());
// app.use(upload.array());
app.get("/", (req, res) => {
  res.send("hello");
});

app.use("/post", postRoute);
//error middleware
app.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

app.listen(5000);
