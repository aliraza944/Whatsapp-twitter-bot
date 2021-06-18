const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const { sendInsta } = require("../bot");
const { sendTweet } = require("../twitter");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); //Appending extension
  },
});

const upload = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    if (file.mimetype !== "image/jpeg") {
      return cb(null, false);
    } else {
      cb(null, true);
    }
  },
});

// , upload.single("image")
router.post("/upload", upload.single("image"), async (req, res) => {
  const filePath = path.join("uploads", req.file.filename);

  await sendTweet(filePath, req.body.mango);
  await sendInsta(filePath, req.body.mango);
  console.log(req.body.mango);
  res.send("post");
  res.end();

  // delete the file after the ends
  fs.unlink(filePath, function (err) {
    if (err) throw err;
    console.log("File deleted!");
  });
});
module.exports = router;
