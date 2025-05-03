const express = require("express");
const multer = require("multer");
const fs = require("fs");
const pdfParse = require("pdf-parse");
const Question = require("../models/Question");

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});

const upload = multer({ storage });

router.post("/upload", upload.single("file"), async (req, res) => {
  try {
    const file = req.file;
    const filePath = file.path;
    let extractedText = "";

    if (file.mimetype === "application/pdf") {
      const dataBuffer = fs.readFileSync(file.path);
      const pdfData = await pdfParse(dataBuffer);
      extractedText = pdfData.text.trim();
    } else {
      return res.status(400).json({ message: "Unsupported file format. Use PDF with JSON data." });
    }

    let questions;
    try {
      questions = JSON.parse(extractedText);
    } catch (jsonErr) {
      return res.status(400).json({ message: "Failed to parse JSON from PDF text", error: jsonErr.message });
    }

    // Validate: optional, but recommended
    if (!Array.isArray(questions)) {
      return res.status(400).json({ message: "Parsed data is not an array" });
    }

    // Insert into MongoDB
    await Question.insertMany(questions);
    fs.unlink(filePath, (err) => {
        if (err) console.error("Error deleting file:", err);
      });
    res.json({ message: "Questions saved successfully", count: questions.length });

   

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

module.exports = router;
