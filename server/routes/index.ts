import express from "express";
import { db } from "../db/conn";
import { uploadDirect } from "@uploadcare/upload-client";
import multer = require("multer");

const storage = multer.memoryStorage();

const uploader = multer({
  storage: storage,
});

const router = express.Router();

router.get("/health-check", (_req, res) => {
  res.send("Hello World!");
});

router.get("/getImages", async (_req, res) => {
  try {
    const images = await db.collection("images").find({}).toArray();
    res.json(images);
  } catch (error) {
    return res
      .status(500)
      .json({ error: error.message || "Failed to fetch images" });
  }
});

router.post("/uploadImage", uploader.single("file"), async (req, res) => {
  try {
    const result = await db.collection("images").insertOne({
      image: req.file,
      createdAt: new Date(),
    });
    res.send(result);
  } catch (error) {
    return res
      .status(500)
      .json({ error: error.message || "Failed to get uploaded files" });
  }
});

//Does not work due to MIME type
router.post("/uploadTest", async (req, res) => {
  try {
    const file = req.body;
    if (!file) {
      return res.status(400).json({ error: "File not found in the request" });
    }

    const fileData = await uploadDirect(file, {
      publicKey: "e35cd74bc5c34a71c41e",
      store: true,
    });

    return res.status(200).json({ fileData });
  } catch (error) {
    console.error("Error during file upload:", error);
    return res
      .status(500)
      .json({ error: "An error occurred during file upload" });
  }
});

export default router;
