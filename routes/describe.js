const express = require("express");
const router = express.Router();
const { describeImage } = require("../services/replicateService");

router.post("/", async (req, res) => {
  try {
    const { imageUrl } = req.body;
    if (!imageUrl) {
      return res.status(400).json({ error: "Image URL is required" });
    }
    const description = await describeImage(imageUrl);
    res.json({ description });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message || "Server error" });
  }
});

module.exports = router;
